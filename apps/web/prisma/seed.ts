import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@example.com";
  const userEmail = "user@example.com";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.warn("Seed data already exists — skipping");
    await prisma.$disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin123!", 12);

  await prisma.user.create({
    data: {
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      emailVerified: new Date(),
      role: Role.ADMIN,
    },
  });

  const userPassword = await bcrypt.hash("User1234!", 12);

  await prisma.user.create({
    data: {
      name: "Test User",
      email: userEmail,
      password: userPassword,
      emailVerified: new Date(),
      role: Role.MEMBER,
    },
  });

  console.warn("Seed data created successfully");
  console.warn(`  Admin: ${adminEmail} / Admin123!`);
  console.warn(`  User:  ${userEmail} / User1234!`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
