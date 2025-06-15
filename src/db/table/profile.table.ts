import { column, table } from "@/lib/custom-schema";
import { uuid } from "drizzle-orm/pg-core";
import { TbUser } from "./user.table";

export type TbProfile = typeof TbProfile;

export const TbProfile = table("profile", {
  id: uuid("id")
    .notNull()
    .primaryKey()
    .references(() => TbUser.id),
  fullName: column.text("full_name"),
  email: column.text("email").notNull().unique(),
  phoneNumber: column.text("phone_number"),
  avatarUrl: column.text("avatar_url"),
  role: column.text("role").default("customer").notNull(),
  createdAt: column.createdAt,
  updatedAt: column.updatedAt,
});
