import { prisma } from "@/lib/db";
import { VerifyEmailContent } from "./content";

type VerifyEmailPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : null;

  if (!token) {
    return <VerifyEmailContent status="missing-token" email="" />;
  }

  const storedToken = await prisma.verificationToken.findFirst({
    where: { token },
  });

  if (!storedToken || storedToken.expires < new Date()) {
    return <VerifyEmailContent status="invalid-token" email="" />;
  }

  await prisma.user.update({
    where: { email: storedToken.identifier },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({
    where: { id: storedToken.id },
  });

  return <VerifyEmailContent status="verified" email={storedToken.identifier} />;
}
