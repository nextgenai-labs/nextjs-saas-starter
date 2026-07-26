import { NextResponse } from "next/server";
import { AppError } from "@/lib/errors";

type ApiSuccessResponse<T = unknown> = {
  success: true;
  data: T;
};

type ApiErrorResponse = {
  success: false;
  error: {
    message: string;
    code: string;
    details?: Record<string, unknown>;
  };
};

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export function success<T>(data: T, status = 200): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

export function created<T>(data: T): NextResponse<ApiSuccessResponse<T>> {
  return success(data, 201);
}

export function noContent(): NextResponse {
  return new NextResponse(null, { status: 204 });
}

export function error(
  message: string,
  code: string,
  status = 500,
  details?: Record<string, unknown>,
): NextResponse<ApiErrorResponse> {
  return NextResponse.json({ success: false, error: { message, code, details } }, { status });
}

export function handleAppError(err: AppError): NextResponse<ApiErrorResponse> {
  return error(err.message, err.code, err.httpStatus, err.details);
}

export function handleUnknownError(err: unknown): NextResponse<ApiErrorResponse> {
  const message =
    process.env.NODE_ENV === "production"
      ? "An unexpected error occurred"
      : err instanceof Error
        ? err.message
        : "Unknown error";

  return error(message, "INTERNAL_ERROR", 500);
}
