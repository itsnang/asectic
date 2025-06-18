import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createDB, createDBClient } from "@/lib/init-db";
import { env } from "@/lib/env";
import { TbUser, TbSession, TbAccount } from "@/db/table";

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
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
});
