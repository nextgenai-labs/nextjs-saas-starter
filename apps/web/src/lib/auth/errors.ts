export class AuthError extends Error {
  public readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = "AuthError";
    this.code = code;
  }
}

export class UserNotFoundError extends AuthError {
  constructor() {
    super("User not found", "USER_NOT_FOUND");
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor() {
    super("Invalid email or password", "INVALID_CREDENTIALS");
  }
}

export class EmailNotVerifiedError extends AuthError {
  constructor() {
    super("Email not verified", "EMAIL_NOT_VERIFIED");
  }
}

export class AccountLockedError extends AuthError {
  constructor() {
    super("Account temporarily locked due to too many failed attempts", "ACCOUNT_LOCKED");
  }
}

export class UserAlreadyExistsError extends AuthError {
  constructor() {
    super("A user with this email already exists", "USER_ALREADY_EXISTS");
  }
}

export class InvalidTokenError extends AuthError {
  constructor() {
    super("Invalid or expired token", "INVALID_TOKEN");
  }
}
