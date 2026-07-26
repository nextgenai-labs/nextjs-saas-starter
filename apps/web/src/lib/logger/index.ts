import { getEnv } from "@/lib/validation/env";

type LogLevel = "debug" | "info" | "warn" | "error";

type LogMeta = Record<string, unknown>;

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

let _currentLevelValue: LogLevel | null = null;

function getCurrentLevel(): LogLevel {
  if (!_currentLevelValue) {
    try {
      _currentLevelValue = getEnv().LOG_LEVEL;
    } catch {
      _currentLevelValue = "info";
    }
  }
  return _currentLevelValue;
}

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[getCurrentLevel()];
}

function isProduction(): boolean {
  try {
    return getEnv().NODE_ENV === "production";
  } catch {
    return false;
  }
}

function formatStructured(level: LogLevel, message: string, meta?: LogMeta): string {
  const entry = {
    timestamp: new Date().toISOString(),
    level: level.toUpperCase(),
    message,
    ...(meta && Object.keys(meta).length > 0 ? { meta } : {}),
  };
  return JSON.stringify(entry);
}

function formatHuman(level: LogLevel, message: string, meta?: LogMeta): string {
  const timestamp = new Date().toISOString();
  const metaStr = meta && Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : "";
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
}

function formatMessage(level: LogLevel, message: string, meta?: LogMeta): string {
  if (isProduction()) {
    return formatStructured(level, message, meta);
  }
  return formatHuman(level, message, meta);
}

function createLogger(defaultMeta?: LogMeta) {
  const log = (level: LogLevel, message: string, meta?: LogMeta): void => {
    if (!shouldLog(level)) return;

    const mergedMeta = defaultMeta && meta ? { ...defaultMeta, ...meta } : (meta ?? defaultMeta);
    const formatted = formatMessage(level, message, mergedMeta);

    switch (level) {
      case "debug":
        console.warn(formatted);
        break;
      case "info":
        console.warn(formatted);
        break;
      case "warn":
        console.warn(formatted);
        break;
      case "error":
        console.error(formatted);
        break;
    }
  };

  return {
    debug: (message: string, meta?: LogMeta) => log("debug", message, meta),
    info: (message: string, meta?: LogMeta) => log("info", message, meta),
    warn: (message: string, meta?: LogMeta) => log("warn", message, meta),
    error: (message: string, meta?: LogMeta) => log("error", message, meta),
    withDefaults: (newMeta: LogMeta) => {
      const mergedDefault = defaultMeta ? { ...defaultMeta, ...newMeta } : newMeta;
      return createLogger(mergedDefault);
    },
  };
}

export const logger = createLogger();
