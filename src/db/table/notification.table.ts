import { column, table } from "@/lib/custom-schema";
import { genId } from "@/utils/gen-id";
import { text, uuid } from "drizzle-orm/pg-core";
import { TbProfile } from "./profile.table";

export type TbNotification = typeof TbNotification;

export const TbNotification = table("notification", {
  id: text("id").notNull().primaryKey().$defaultFn(genId("notification")),
  userId: uuid("user_id")
    .notNull()
    .references(() => TbProfile.id),
  type: column.text("type").notNull(),
  message: column.text("message").notNull(),
  isRead: column.boolean("is_read").default(false).notNull(),
  createdAt: column.createdAt,
  updatedAt: column.updatedAt,
  deletedAt: column.deletedAt,
});
