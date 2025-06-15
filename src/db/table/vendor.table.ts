import { column, table } from "@/lib/custom-schema";
import { genId } from "@/utils/gen-id";
import { text, decimal, uuid } from "drizzle-orm/pg-core";
import { TbProfile } from "./profile.table";

export type TbVendor = typeof TbVendor;

export const TbVendor = table("vendor", {
  id: text("id").notNull().primaryKey().$defaultFn(genId("vendor")),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => TbProfile.id),
  shopName: column.text("shop_name").notNull().unique(),
  shopSlug: column.text("shop_slug").notNull().unique(),
  shopDescription: column.text("shop_description"),
  logoUrl: column.text("logo_url"),
  bannerUrl: column.text("banner_url"),
  bankAccountDetails: column.json("bank_account_details"),
  status: column.text("status").default("pending_approval").notNull(),
  commissionRate: decimal("commission_rate", { precision: 5, scale: 2 })
    .default("10.00")
    .notNull(),
  createdAt: column.createdAt,
  updatedAt: column.updatedAt,
  deletedAt: column.deletedAt,
});
