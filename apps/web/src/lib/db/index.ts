import { drizzle } from "drizzle-orm/postgres-js";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let _db: PostgresJsDatabase<typeof schema> | undefined;

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  return postgres(connectionString, {
    max: 10,
    ssl: connectionString.includes("localhost") ? false : "require",
  });
}

export function getDb() {
  if (!_db) {
    _db = drizzle(createClient(), { schema });
  }
  return _db;
}

export function resetDb() {
  _db = undefined;
}
