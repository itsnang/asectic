import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createDB, createDBClient } from "@/lib/init-db";
import { env } from "@/lib/env";
import { TbUser, TbSession, TbAccount, TbVerification } from "@/db/table";
import { sendPasswordResetEmail, sendEmailVerification } from "@/lib/email";

const client = createDBClient({
  url: env.DATABASE_URL,
});
const db = createDB(client);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: TbUser,
      session: TbSession,
      account: TbAccount,
      verification: TbVerification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    forgotPasswordEnabled: true,
    sendResetPassword: async ({ user, url }) => {
      if (env.RESEND_API_KEY) {
        try {
          await sendPasswordResetEmail({
            to: user.email,
            resetUrl: url,
            userName: user.name || "there",
          });
          console.log("Password reset email sent successfully to:", user.email);
        } catch (error) {
          console.error("Failed to send password reset email:", error);
          // Fallback: log the URL for development
          console.log("Reset URL (fallback):", url);
          throw new Error("Failed to send password reset email");
        }
      } else {
        // Development fallback - log the reset URL
        console.log("RESEND_API_KEY not configured. Reset URL:", url);
        console.log("Visit this URL to reset password for:", user.email);
        throw new Error("Failed to send password reset email");
      }
    },
  },
  emailVerification: {
    enabled: true,
    sendVerificationEmail: async ({ user, url }) => {
      if (env.RESEND_API_KEY) {
        try {
          await sendEmailVerification({
            to: user.email,
            verificationUrl: url,
            userName: user.name || "there",
          });
          console.log("Email verification sent successfully to:", user.email);
        } catch (error) {
          console.error("Failed to send email verification:", error);
          console.log("Verification URL (fallback):", url);
        }
      } else {
        console.log("RESEND_API_KEY not configured. Verification URL:", url);
        console.log("Visit this URL to verify email for:", user.email);
      }
    },
  },
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
});
