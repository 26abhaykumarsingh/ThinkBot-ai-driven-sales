import { pgTable, text, serial, numeric, integer, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  symbol: varchar("symbol", { length: 10 }).notNull(),
  name: text("name").notNull(),
  revenue: numeric("revenue"),
  lastSale: numeric("last_sale"),
  netChange: numeric("net_change"),
  percentChange: numeric("percent_change"),
  marketCap: numeric("market_cap").notNull(),
  country: text("country").notNull(),
  ipoYear: integer("ipo_year"),
  volume: integer("volume"),
  sector: text("sector").notNull(),
  industry: text("industry").notNull(),
  status: text("status").notNull(),
  aiInsight: text("ai_insight"),
  about: text("about")
});

export const insertCompanySchema = createInsertSchema(companies).omit({ id: true });

export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companies.$inferSelect;

export const CompanyStatus = {
  TOP_PROSPECT: "Top Prospect",
  PROMISING: "Promising Opportunity",
  NEEDS_REVIEW: "Needs Review",
  LOW_POTENTIAL: "Low Potential"
} as const;

export type CompanyStatus = typeof CompanyStatus[keyof typeof CompanyStatus];
