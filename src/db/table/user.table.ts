import { column, table } from "@/lib/custom-schema";
import { uuid } from "drizzle-orm/pg-core";

export type TbUser = typeof TbUser;

export const TbUser = table("user", {
  id: uuid("id").notNull().primaryKey(),
  name: column.text("name"),
  email: column.text("email").notNull().unique(),
  emailVerified: column.timestamp("email_verified"),
  image: column.text("image"),
  passwordHash: column.text("password_hash"),
  createdAt: column.createdAt,
  updatedAt: column.updatedAt,
});
