import { prisma } from "@/lib/db/client";
import type { Prisma, Role } from "@prisma/client";

const userSelect = {
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  image: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} as const;

export type UserRecord = Prisma.UserGetPayload<{
  select: typeof userSelect;
}>;

export const userRepository = {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id, deletedAt: null },
      select: userSelect,
    });
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase(), deletedAt: null },
      select: { ...userSelect, password: true },
    });
  },

  async findByEmailWithPassword(email: string) {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase(), deletedAt: null },
    });
  },

  async existsByEmail(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true },
    });
    return user !== null;
  },

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data: { ...data, email: data.email.toLowerCase() },
      select: userSelect,
    });
  },

  async update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
      select: userSelect,
    });
  },

  async softDelete(id: string) {
    return prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
      select: userSelect,
    });
  },

  async list(params: { page: number; pageSize: number; role?: Role }) {
    const where: Prisma.UserWhereInput = { deletedAt: null };

    if (params.role) {
      where.role = params.role;
    }

    const [items, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: userSelect,
        skip: (params.page - 1) * params.pageSize,
        take: params.pageSize,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
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
