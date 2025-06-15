import { column, table } from "@/lib/custom-schema";
import { genId } from "@/utils/gen-id";
import { text, decimal } from "drizzle-orm/pg-core";
import { TbProduct } from "./product.table";

export type TbProductVariant = typeof TbProductVariant;

export const TbProductVariant = table("product_variant", {
  id: text("id").notNull().primaryKey().$defaultFn(genId("variant")),
  productId: text("product_id")
    .notNull()
    .references(() => TbProduct.id),
  size: column.text("size"),
  color: column.text("color"),
  material: column.text("material"),
  priceAdjustment: decimal("price_adjustment", { precision: 10, scale: 2 })
    .default("0.00")
    .notNull(),
  stock: column.int("stock").notNull(),
  imageUrls: column.json("image_urls").$type<string[]>(),
  skuVariant: column.text("sku_variant").unique(),
  createdAt: column.createdAt,
  updatedAt: column.updatedAt,
  deletedAt: column.deletedAt,
});
