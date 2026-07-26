import { PrismaClient, Role, MemberRole } from "@prisma/client";
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

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      emailVerified: new Date(),
      role: Role.ADMIN,
    },
  });

  const userPassword = await bcrypt.hash("User1234!", 12);

  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: userEmail,
      password: userPassword,
      emailVerified: new Date(),
      role: Role.MEMBER,
    },
  });

  const workspace = await prisma.workspace.create({
    data: {
      name: "Acme Corp",
      slug: "acme-corp",
    },
  });

  await prisma.member.createMany({
    data: [
      { userId: admin.id, workspaceId: workspace.id, role: MemberRole.OWNER },
      { userId: user.id, workspaceId: workspace.id, role: MemberRole.MEMBER },
    ],
  });

  console.warn("Seed data created successfully");
  console.warn(`  Admin: ${adminEmail} / Admin123!`);
  console.warn(`  User:  ${userEmail} / User1234!`);
  console.warn(`  Workspace: Acme Corp (acme-corp)`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
