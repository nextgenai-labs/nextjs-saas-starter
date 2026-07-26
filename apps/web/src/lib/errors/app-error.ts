export class AppError extends Error {
  public readonly code: string;
  public readonly httpStatus: number;
  public readonly details?: Record<string, unknown>;

  constructor(message: string, code: string, httpStatus = 500, details?: Record<string, unknown>) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.httpStatus = httpStatus;
    this.details = details;
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id ? `${resource} with id "${id}" not found` : `${resource} not found`;
    super(message, "NOT_FOUND", 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, "VALIDATION_ERROR", 400, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Authentication required") {
    super(message, "UNAUTHORIZED", 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Insufficient permissions") {
    super(message, "FORBIDDEN", 403);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, "CONFLICT", 409);
  }
}

export class RateLimitError extends AppError {
  constructor(retryAfter: number) {
    super(`Too many requests. Try again in ${retryAfter} seconds.`, "RATE_LIMITED", 429, {
      retryAfter,
    });
  }
}

export class InternalError extends AppError {
  constructor(message = "An unexpected error occurred") {
    super(message, "INTERNAL_ERROR", 500);
  }
}
