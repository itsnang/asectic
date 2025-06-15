import { column, table } from "@/lib/custom-schema";
import { genId } from "@/utils/gen-id";
import { text } from "drizzle-orm/pg-core";

export type TbCategory = typeof TbCategory;

export const TbCategory = table("category", {
  id: text("id").notNull().primaryKey().$defaultFn(genId("category")),
  name: column.text("name").notNull().unique(),
  slug: column.text("slug").notNull().unique(),
  description: column.text("description"),
  parentCategoryId: text("parent_category_id"),
  createdAt: column.createdAt,
  updatedAt: column.updatedAt,
  deletedAt: column.deletedAt,
});
