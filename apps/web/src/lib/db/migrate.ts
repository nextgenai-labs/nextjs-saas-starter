import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const migrationClient = postgres(connectionString, { max: 1 });

async function runMigrate() {
  const db = drizzle(migrationClient);
  await migrate(db, { migrationsFolder: "./drizzle" });
  await migrationClient.end();
}

runMigrate()
  .then(() => {
    console.warn("Migration completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  });
