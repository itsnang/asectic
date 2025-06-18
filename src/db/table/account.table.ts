import { column, table } from "@/lib/custom-schema";
import { TbUser } from "./user.table";

export type TbAccount = typeof TbAccount;

export const TbAccount = table("account", {
  id: column.id,
  accountId: column.text("account_id").notNull(),
  providerId: column.text("provider_id").notNull(),
  userId: column
    .text("user_id")
    .notNull()
    .references(() => TbUser.id, { onDelete: "cascade" }),
  accessToken: column.text("access_token"),
  refreshToken: column.text("refresh_token"),
  idToken: column.text("id_token"),
  accessTokenExpiresAt: column.timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: column.timestamp("refresh_token_expires_at"),
  scope: column.text("scope"),
  password: column.text("password"),
  createdAt: column.createdAt,
  updatedAt: column.updatedAt,
});
