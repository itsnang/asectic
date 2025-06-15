import { column, table } from "@/lib/custom-schema";
import { genId } from "@/utils/gen-id";
import { text, decimal } from "drizzle-orm/pg-core";

export type TbShippingMethod = typeof TbShippingMethod;

export const TbShippingMethod = table("shipping_method", {
  id: text("id").notNull().primaryKey().$defaultFn(genId("shipping")),
  name: column.text("name").notNull(),
  cost: decimal("cost", { precision: 10, scale: 2 }).notNull(),
  estimatedDeliveryTime: column.int("estimated_delivery_time").notNull(), // in days
  createdAt: column.createdAt,
  updatedAt: column.updatedAt,
  deletedAt: column.deletedAt,
});
