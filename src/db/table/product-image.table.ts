import { column, table } from "@/lib/custom-schema";
import { genId } from "@/utils/gen-id";
import { text } from "drizzle-orm/pg-core";
import { TbProduct } from "./product.table";

export type TbProductImage = typeof TbProductImage;

export const TbProductImage = table("product_image", {
  id: text("id").notNull().primaryKey().$defaultFn(genId("product_image")),
  productId: text("product_id")
    .notNull()
    .references(() => TbProduct.id),
  imageUrl: column.text("image_url").notNull(),
  altText: column.text("alt_text"),
  sortOrder: column.int("sort_order").default(0).notNull(),
  createdAt: column.createdAt,
  updatedAt: column.updatedAt,
  deletedAt: column.deletedAt,
});
