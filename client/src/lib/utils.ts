import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const industry_sector_mapping = {
  "Life Insurance": "Finance",
  "Semiconductors": "Technology",
  "Industrial Machinery/Components": "Technology",
  "Computer Software: Prepackaged Software": "Technology",
  "Computer peripheral equipment": "Technology",
  "Major Banks": "Finance",
  "Finance: Consumer Services": "Finance",
  "Blank Checks": "Finance",
  "Savings Institutions": "Finance",
  "Specialty Foods": "Consumer Staples",
  "Computer Software: Programming Data Processing": "Technology",
  "EDP Services": "Technology",
  "Retail: Computer Software & Peripheral Equipment": "Technology",
  "Real Estate": "Finance",
  "Banks": "Finance",
  "Packaged Foods": "Consumer Staples",
  "Investment Managers": "Finance",
  "Electrical Products": "Technology",
  "Electronic Components": "Technology",
  "Specialty Insurers": "Finance",
  "Diversified Financial Services": "Finance",
  "Investment Bankers/Brokers/Service": "Finance",
  "SaaS": "Technology",
  "Banking": "Finance",
  "Retail": "Retail"
};