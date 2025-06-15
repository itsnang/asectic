import { column, table } from "@/lib/custom-schema";
import { genId } from "@/utils/gen-id";
import { text, uuid } from "drizzle-orm/pg-core";
import { TbProduct } from "./product.table";
import { TbProfile } from "./profile.table";

export type TbReview = typeof TbReview;

export const TbReview = table("review", {
  id: text("id").notNull().primaryKey().$defaultFn(genId("review")),
  productId: text("product_id")
    .notNull()
    .references(() => TbProduct.id),
  customerId: uuid("customer_id")
    .notNull()
    .references(() => TbProfile.id),
  rating: column.int("rating").notNull(), // 1-5 stars, constraint handled at app level
  comment: column.text("comment"),
  status: column.text("status").default("pending").notNull(),
  reviewDate: column.timestamp("review_date").notNull().defaultNow(),
  createdAt: column.createdAt,
  updatedAt: column.updatedAt,
  deletedAt: column.deletedAt,
});
