import { Resend } from "resend";
import { env } from "./env";

const resend = new Resend(env.RESEND_API_KEY);

interface SendPasswordResetEmailProps {
  to: string;
  resetUrl: string;
  userName?: string;
}

export async function sendPasswordResetEmail({
  to,
  resetUrl,
  userName = "there",
}: SendPasswordResetEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Ace <onboarding@resend.dev>",
      to: [to],
      subject: "Reset Your Password - SDFM 2520",
      html: generatePasswordResetEmailHTML({ resetUrl, userName, to }),
      text: generatePasswordResetEmailText({ resetUrl, userName, to }),
    });

    if (error) {
      console.error("Error sending password reset email:", error);
      throw new Error("Failed to send password reset email");
    }

    console.log("Password reset email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error in sendPasswordResetEmail:", error);
    throw error;
  }
}

function generatePasswordResetEmailHTML({
  resetUrl,
  userName,
  to,
}: {
  resetUrl: string;
  userName: string;
  to: string;
}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background-color: white;
          border-radius: 10px;
          padding: 40px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #000;
          margin-bottom: 10px;
        }
        .title {
          font-size: 24px;
          color: #333;
          margin-bottom: 20px;
        }
        .content {
          margin-bottom: 30px;
        }
        .button {
          display: inline-block;
          background-color: #000;
          color: white;
          padding: 14px 28px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          margin: 20px 0;
        }
        .button:hover {
          background-color: #333;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          font-size: 14px;
          color: #666;
          text-align: center;
        }
        .security-note {
          background-color: #f8f9fa;
          border-left: 4px solid #007bff;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        @media (max-width: 600px) {
          body { padding: 10px; }
          .container { padding: 20px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">SDFM 2520</div>
          <h1 class="title">Reset Your Password</h1>
        </div>

        <div class="content">
          <p>Hi ${userName},</p>

          <p>We received a request to reset the password for your SDFM 2520 account. If you made this request, click the button below to reset your password:</p>

          <div style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset My Password</a>
          </div>

          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #007bff;">${resetUrl}</p>

          <div class="security-note">
            <p><strong>Security Note:</strong></p>
            <ul>
              <li>This link will expire in 1 hour for security reasons</li>
              <li>If you didn't request this password reset, please ignore this email</li>
              <li>Your password won't be changed until you click the link above and create a new one</li>
            </ul>
          </div>

          <p>If you're having trouble or didn't request this reset, please contact our support team.</p>

          <p>Best regards,<br>The SDFM 2520 Team</p>
        </div>

        <div class="footer">
          <p>This email was sent to ${to}. If you no longer wish to receive these emails, you can unsubscribe from your account settings.</p>
          <p>&copy; 2024 SDFM 2520. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generatePasswordResetEmailText({
  resetUrl,
  userName,
  to,
}: {
  resetUrl: string;
  userName: string;
  to: string;
}) {
  return `
Reset Your Password - SDFM 2520

Hi ${userName},

We received a request to reset the password for your SDFM 2520 account.

To reset your password, click or copy the following link into your browser:
${resetUrl}

This link will expire in 1 hour for security reasons.

If you didn't request this password reset, please ignore this email. Your password won't be changed until you click the link above and create a new one.

If you're having trouble, please contact our support team.

Best regards,
The SDFM 2520 Team

---
This email was sent to ${to}.
© 2024 SDFM 2520. All rights reserved.
  `;
}
