import { env } from "./env";

interface SendPasswordResetEmailProps {
  to: string;
  resetUrl: string;
  userName?: string;
}

interface SendEmailVerificationProps {
  to: string;
  verificationUrl: string;
  userName?: string;
}

export async function sendPasswordResetEmail({
  to,
  resetUrl,
  userName = "there",
}: SendPasswordResetEmailProps) {
  try {
    const response = await fetch(`${env.BETTER_AUTH_URL}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        resetUrl,
        userName,
        type: "password-reset",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Error sending password reset email:", errorData);
      throw new Error("Failed to send password reset email");
    }

    const data = await response.json();
    console.log("Password reset email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error in sendPasswordResetEmail:", error);
    throw error;
  }
}

export async function sendEmailVerification({
  to,
  verificationUrl,
  userName = "there",
}: SendEmailVerificationProps) {
  try {
    const response = await fetch(`${env.BETTER_AUTH_URL}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        resetUrl: verificationUrl, // Using resetUrl parameter for consistency with API
        userName,
        type: "email-verification",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Error sending email verification:", errorData);
      throw new Error("Failed to send email verification");
    }

    const data = await response.json();
    console.log("Email verification sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error in sendEmailVerification:", error);
    throw error;
  }
}
