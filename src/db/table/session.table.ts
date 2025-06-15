import { column, table } from "@/lib/custom-schema";
import { genId } from "@/utils/gen-id";
import { text, uuid } from "drizzle-orm/pg-core";
import { TbUser } from "./user.table";

export type TbSession = typeof TbSession;

export const TbSession = table("session", {
  id: text("id").notNull().primaryKey().$defaultFn(genId("session")),
  sessionToken: column.text("session_token").notNull().unique(),
  userId: uuid("user_id")
    .notNull()
    .references(() => TbUser.id),
  expires: column.timestamp("expires").notNull(),
  createdAt: column.createdAt,
  updatedAt: column.updatedAt,
});
