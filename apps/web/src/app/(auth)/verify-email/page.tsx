import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { users, verificationTokens } from "@/lib/db/schema";
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

  const storedToken = await getDb().query.verificationTokens.findFirst({
    where: (vt, { eq }) => eq(vt.token, token),
  });

  if (!storedToken || storedToken.expires < new Date()) {
    return <VerifyEmailContent status="invalid-token" email="" />;
  }

  await getDb()
    .update(users)
    .set({ emailVerified: new Date() })
    .where(eq(users.email, storedToken.identifier));

  await getDb().delete(verificationTokens).where(eq(verificationTokens.token, token));

  return <VerifyEmailContent status="verified" email={storedToken.identifier} />;
}
