import { column, table } from "@/lib/custom-schema";
import { TbUser } from "./user.table";

export type TbSession = typeof TbSession;

export const TbSession = table("session", {
  id: column.id,
  expiresAt: column.timestamp("expires_at").notNull(),
  token: column.text("token").notNull().unique(),
  createdAt: column.createdAt,
  updatedAt: column.updatedAt,
  ipAddress: column.text("ip_address"),
  userAgent: column.text("user_agent"),
  userId: column
    .text("user_id")
    .notNull()
    .references(() => TbUser.id, { onDelete: "cascade" }),
});
