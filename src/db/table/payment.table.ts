import { column, table } from "@/lib/custom-schema";
import { genId } from "@/utils/gen-id";
import { text, decimal } from "drizzle-orm/pg-core";
import { TbOrder } from "./order.table";

export type TbPayment = typeof TbPayment;

export const TbPayment = table("payment", {
  id: text("id").notNull().primaryKey().$defaultFn(genId("payment")),
  orderId: text("order_id")
    .notNull()
    .references(() => TbOrder.id),
  transactionId: column.text("transaction_id").notNull().unique(),
  paymentMethod: column.text("payment_method").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: column.text("currency").default("USD").notNull(),
  status: column.text("status").default("pending").notNull(),
  rawResponse: column.json("raw_response"),
  paymentDate: column.timestamp("payment_date").notNull().defaultNow(),
  createdAt: column.createdAt,
  updatedAt: column.updatedAt,
  deletedAt: column.deletedAt,
});
