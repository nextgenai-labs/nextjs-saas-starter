import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/user.repository";
import { auditService } from "./audit.service";
import { NotFoundError, ConflictError, ValidationError } from "@/lib/errors";
import { logger } from "@/lib/logger";

export const userService = {
  async getById(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw new NotFoundError("User", id);
    return user;
  },

  async getByEmail(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new NotFoundError("User");
    return user;
  },

  async create(data: { name: string; email: string; password?: string }) {
    const exists = await userRepository.existsByEmail(data.email);
    if (exists) throw new ConflictError("A user with this email already exists");

    const user = await userRepository.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    logger.info("User created", { userId: user.id, email: user.email });

    await auditService.log({
      action: "USER_CREATED",
      entityType: "user",
      entityId: user.id,
      description: `User ${user.email} created`,
    });

    return user;
  },

  async updateProfile(id: string, data: { name?: string; image?: string }, actorId?: string) {
    await this.getById(id);

    const updated = await userRepository.update(id, data);

    logger.info("User profile updated", { userId: id });

    await auditService.log({
      action: "USER_EMAIL_CHANGED",
      entityType: "user",
      entityId: id,
      description: "User profile updated",
      userId: actorId,
    });

    return updated;
  },

  async changePassword(id: string, currentPassword: string, newPassword: string) {
    const user = await userRepository.findByEmailWithPassword((await this.getById(id)).email);

    if (!user?.password) {
      throw new ValidationError("Cannot change password. Use OAuth sign-in.");
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) throw new ValidationError("Current password is incorrect");

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await userRepository.update(id, { password: hashedPassword });

    logger.info("Password changed", { userId: id });

    await auditService.log({
      action: "USER_PASSWORD_CHANGED",
      entityType: "user",
      entityId: id,
      description: "Password changed",
      userId: id,
    });
  },

  async softDelete(id: string, actorId?: string) {
    await this.getById(id);
    await userRepository.softDelete(id);

    logger.info("User soft-deleted", { userId: id });

    await auditService.log({
      action: "USER_DELETED",
      entityType: "user",
      entityId: id,
      description: "User deleted (soft)",
      userId: actorId,
    });
  },

  async list(params: { page: number; pageSize: number }) {
    return userRepository.list(params);
  },
};
