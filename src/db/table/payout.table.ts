import { column, table } from "@/lib/custom-schema";
import { genId } from "@/utils/gen-id";
import { text, decimal } from "drizzle-orm/pg-core";
import { TbVendor } from "./vendor.table";

export type TbPayout = typeof TbPayout;

export const TbPayout = table("payout", {
  id: text("id").notNull().primaryKey().$defaultFn(genId("payout")),
  vendorId: text("vendor_id")
    .notNull()
    .references(() => TbVendor.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: column.text("status").default("pending").notNull(),
  transactionReference: column.text("transaction_reference"),
  payoutDate: column.timestamp("payout_date").notNull().defaultNow(),
  createdAt: column.createdAt,
  updatedAt: column.updatedAt,
  deletedAt: column.deletedAt,
});
