import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export const idParamSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email address")
  .max(255, "Email must be no more than 255 characters")
  .transform((v) => v.toLowerCase());

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be no more than 128 characters");

export const nameSchema = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name must be no more than 100 characters")
  .regex(/^[a-zA-Z\s\-'.]+$/, "Name contains invalid characters");

export const uuidSchema = z.string().uuid("Invalid UUID format");

export type PaginationInput = z.infer<typeof paginationSchema>;
export type IdParam = z.infer<typeof idParamSchema>;
