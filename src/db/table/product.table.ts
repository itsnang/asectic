import { column, table } from "@/lib/custom-schema";
import { genId } from "@/utils/gen-id";
import { text, decimal } from "drizzle-orm/pg-core";
import { TbVendor } from "./vendor.table";
import { TbCategory } from "./category.table";

export type TbProduct = typeof TbProduct;

export const TbProduct = table("product", {
  id: text("id").notNull().primaryKey().$defaultFn(genId("product")),
  vendorId: text("vendor_id")
    .notNull()
    .references(() => TbVendor.id),
  name: column.text("name").notNull(),
  slug: column.text("slug").notNull(),
  description: column.text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  categoryId: text("category_id")
    .notNull()
    .references(() => TbCategory.id),
  stock: column.int("stock").default(0).notNull(),
  imageUrls: column.json("image_urls").$type<string[]>(),
  sku: column.text("sku").notNull().unique(),
  status: column.text("status").default("draft").notNull(),
  isFeatured: column.boolean("is_featured").default(false).notNull(),
  createdAt: column.createdAt,
  updatedAt: column.updatedAt,
  deletedAt: column.deletedAt,
});
