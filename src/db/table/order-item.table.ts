import { column, table } from "@/lib/custom-schema";
import { genId } from "@/utils/gen-id";
import { text, decimal } from "drizzle-orm/pg-core";
import { TbOrder } from "./order.table";
import { TbProduct } from "./product.table";
import { TbProductVariant } from "./product-variant.table";
import { TbVendor } from "./vendor.table";

export type TbOrderItem = typeof TbOrderItem;

export const TbOrderItem = table("order_item", {
  id: text("id").notNull().primaryKey().$defaultFn(genId("order_item")),
  orderId: text("order_id")
    .notNull()
    .references(() => TbOrder.id),
  productId: text("product_id")
    .notNull()
    .references(() => TbProduct.id),
  variantId: text("variant_id").references(() => TbProductVariant.id),
  vendorId: text("vendor_id")
    .notNull()
    .references(() => TbVendor.id),
  quantity: column.int("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  vendorPayoutAmount: decimal("vendor_payout_amount", {
    precision: 10,
    scale: 2,
  }).notNull(),
  commissionAmount: decimal("commission_amount", {
    precision: 10,
    scale: 2,
  }).notNull(),
  itemStatus: column.text("item_status").default("ordered").notNull(),
  createdAt: column.createdAt,
  updatedAt: column.updatedAt,
  deletedAt: column.deletedAt,
});
