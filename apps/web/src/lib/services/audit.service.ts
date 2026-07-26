import { auditRepository } from "../repositories/audit.repository";
import type { AuditAction } from "@prisma/client";

type LogParams = {
  action: AuditAction;
  entityType: string;
  entityId: string;
  description?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  userId?: string;
};

export const auditService = {
  async log(params: LogParams) {
    return auditRepository.create(params);
  },

  async findByEntity(entityType: string, entityId: string) {
    return auditRepository.findByEntity(entityType, entityId);
  },

  async list(params: {
    page: number;
    pageSize: number;
    action?: AuditAction;
    userId?: string;
    entityType?: string;
  }) {
    return auditRepository.list(params);
  },
};
