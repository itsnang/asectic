import { column, table } from "@/lib/custom-schema";
import { genId } from "@/utils/gen-id";
import { text, decimal, uuid } from "drizzle-orm/pg-core";
import { TbProfile } from "./profile.table";
import { TbVendor } from "./vendor.table";

export type TbOrder = typeof TbOrder;

export const TbOrder = table("order", {
  id: text("id").notNull().primaryKey().$defaultFn(genId("order")),
  customerId: uuid("customer_id")
    .notNull()
    .references(() => TbProfile.id),
  vendorId: text("vendor_id").references(() => TbVendor.id), // nullable for multi-vendor orders
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  shippingAddress: column.json("shipping_address").notNull(),
  paymentStatus: column.text("payment_status").default("pending").notNull(),
  orderStatus: column.text("order_status").default("new").notNull(),
  orderDate: column.timestamp("order_date").notNull().defaultNow(),
  createdAt: column.createdAt,
  updatedAt: column.updatedAt,
  deletedAt: column.deletedAt,
});
