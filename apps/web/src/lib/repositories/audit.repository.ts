import { prisma } from "@/lib/db/client";
import type { Prisma, AuditAction } from "@prisma/client";

const auditLogSelect = {
  id: true,
  action: true,
  entityType: true,
  entityId: true,
  description: true,
  metadata: true,
  ipAddress: true,
  userAgent: true,
  createdAt: true,
  userId: true,
} as const;

export type AuditLogRecord = Prisma.AuditLogGetPayload<{
  select: typeof auditLogSelect;
}>;

export const auditRepository = {
  async create(data: {
    action: AuditAction;
    entityType: string;
    entityId: string;
    description?: string;
    metadata?: Record<string, unknown>;
    ipAddress?: string;
    userAgent?: string;
    userId?: string;
  }) {
    return prisma.auditLog.create({
      data: {
        action: data.action,
        entityType: data.entityType,
        entityId: data.entityId,
        description: data.description,
        metadata: data.metadata as Prisma.InputJsonValue,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        ...(data.userId ? { userId: data.userId } : {}),
      },
      select: auditLogSelect,
    });
  },

  async findByEntity(entityType: string, entityId: string) {
    return prisma.auditLog.findMany({
      where: { entityType, entityId },
      select: auditLogSelect,
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  },

  async list(params: {
    page: number;
    pageSize: number;
    action?: AuditAction;
    userId?: string;
    entityType?: string;
  }) {
    const where: Prisma.AuditLogWhereInput = {};

    if (params.action) where.action = params.action;
    if (params.userId) where.userId = params.userId;
    if (params.entityType) where.entityType = params.entityType;

    const [items, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        select: auditLogSelect,
        skip: (params.page - 1) * params.pageSize,
        take: params.pageSize,
        orderBy: { createdAt: "desc" },
      }),
      prisma.auditLog.count({ where }),
    ]);

    return {
      items,
      total,
      page: params.page,
      pageSize: params.pageSize,
      totalPages: Math.ceil(total / params.pageSize),
    };
  },
};
