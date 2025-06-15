import { column, table } from "@/lib/custom-schema";
import { unique } from "drizzle-orm/pg-core";

export type TbVerificationToken = typeof TbVerificationToken;

export const TbVerificationToken = table(
  "verification_token",
  {
    identifier: column.text("identifier").notNull(),
    token: column.text("token").notNull().unique(),
    expires: column.timestamp("expires").notNull(),
  },
  (table) => ({
    identifierTokenUnique: unique().on(table.identifier, table.token),
  }),
);
