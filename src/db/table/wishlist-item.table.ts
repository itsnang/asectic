import { column, table } from "@/lib/custom-schema";
import { genId } from "@/utils/gen-id";
import { text, uuid } from "drizzle-orm/pg-core";
import { TbProfile } from "./profile.table";
import { TbProduct } from "./product.table";

export type TbWishlistItem = typeof TbWishlistItem;

export const TbWishlistItem = table("wishlist_item", {
  id: text("id").notNull().primaryKey().$defaultFn(genId("wishlist_item")),
  customerId: uuid("customer_id")
    .notNull()
    .references(() => TbProfile.id),
  productId: text("product_id")
    .notNull()
    .references(() => TbProduct.id),
  createdAt: column.createdAt,
  updatedAt: column.updatedAt,
  deletedAt: column.deletedAt,
});
