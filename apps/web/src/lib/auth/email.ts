import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

let resend: Resend | null = null;

if (resendApiKey) {
  resend = new Resend(resendApiKey);
}

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<void> {
  if (!resend) {
    console.warn("RESEND_API_KEY not configured — email not sent");
    return;
  }

  const from = process.env.RESEND_FROM_EMAIL ?? "noreply@example.com";

  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
  });

  if (error) {
    console.error("Failed to send email:", error);
  }
}

export async function sendVerificationEmail(email: string, token: string): Promise<void> {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/verify-email?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Verify your email address",
    html: `
      <h1>Verify your email</h1>
      <p>Click the link below to verify your email address:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link expires in 24 hours.</p>
      <p>If you did not create an account, you can ignore this email.</p>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/reset-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Reset your password",
    html: `
      <h1>Reset your password</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link expires in 1 hour.</p>
      <p>If you did not request a password reset, you can ignore this email.</p>
    `,
  });
}

export async function sendEmailChangeNotification(
  oldEmail: string,
  newEmail: string,
): Promise<void> {
  await sendEmail({
    to: oldEmail,
    subject: "Your email address has been changed",
    html: `
      <h1>Email changed</h1>
      <p>Your email address has been changed from ${oldEmail} to ${newEmail}.</p>
      <p>If you did not make this change, please contact support immediately.</p>
    `,
  });
}
