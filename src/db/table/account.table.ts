import { column, table } from "@/lib/custom-schema";
import { genId } from "@/utils/gen-id";
import { text, uuid, unique } from "drizzle-orm/pg-core";
import { TbUser } from "./user.table";

export type TbAccount = typeof TbAccount;

export const TbAccount = table(
  "account",
  {
    id: text("id").notNull().primaryKey().$defaultFn(genId("account")),
    userId: uuid("user_id")
      .notNull()
      .references(() => TbUser.id),
    type: column.text("type").notNull(),
    provider: column.text("provider").notNull(),
    providerAccountId: column.text("provider_account_id").notNull(),
    refreshToken: column.text("refresh_token"),
    accessToken: column.text("access_token"),
    expiresAt: column.int("expires_at"),
    idToken: column.text("id_token"),
    scope: column.text("scope"),
    sessionState: column.text("session_state"),
    tokenType: column.text("token_type"),
    createdAt: column.createdAt,
    updatedAt: column.updatedAt,
  },
  (table) => ({
    providerProviderAccountIdUnique: unique().on(
      table.provider,
      table.providerAccountId,
    ),
  }),
);
