import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@nextjs-saas/ui";

type AuthErrorPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const params = await searchParams;
  const error = params.error;

  const errorMessages: Record<string, string> = {
    OAuthAccountNotLinked: "This account is already linked to another sign-in method.",
    OAuthSignin: "There was a problem signing in with your provider.",
    OAuthCallback: "There was a problem processing your sign-in.",
    OAuthCreateAccount: "There was a problem creating your account.",
    EmailSignin: "There was a problem sending the email.",
    CredentialsSignin: "Invalid email or password.",
    default: "An unexpected authentication error occurred.",
  };

  const message =
    error && typeof error === "string"
      ? (errorMessages[error] ?? errorMessages.default)
      : errorMessages.default;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Authentication error</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <p className="text-destructive text-sm">{message}</p>
        <Button asChild>
          <Link href="/login">Back to sign in</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
