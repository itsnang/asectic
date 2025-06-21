import { column, table } from "@/lib/custom-schema";

export type TbVerification = typeof TbVerification;

export const TbVerification = table("verification", {
  id: column.id,
  identifier: column.text("identifier").notNull(),
  value: column.text("value").notNull(),
  expiresAt: column.timestamp("expires_at").notNull(),
  createdAt: column.createdAt,
  updatedAt: column.updatedAt,
});
