import { companies, type Company, type InsertCompany, CompanyStatus } from "@shared/schema";

export interface IStorage {
  getCompanies(offset: number, limit: number, status?: string): Promise<Company[]>;
  getCompanyById(id: number): Promise<Company | undefined>;
}

export class MemStorage implements IStorage {
  private companies: Company[];

  constructor() {
    this.companies = generateMockCompanies();
  }

  async getCompanies(offset: number, limit: number, status?: string): Promise<Company[]> {
    let filtered = this.companies;
    if (status) {
      filtered = filtered.filter(c => c.status === status);
    }
    return filtered.slice(offset, offset + limit);
  }

  async getCompanyById(id: number): Promise<Company | undefined> {
    return this.companies.find(c => c.id === id);
  }
}

function generateMockCompanies(): Company[] {
  const sectors = ["Technology", "Healthcare", "Finance", "Energy", "Consumer"];
  const countries = ["USA", "UK", "Germany", "Japan", "Canada"];
  const statuses = Object.values(CompanyStatus);

  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    symbol: `COMP${i + 1}`,
    name: `Company ${i + 1} Corp`,
    revenue: String(Math.floor(Math.random() * 1000000000)),
    lastSale: String(Math.floor(Math.random() * 1000)),
    netChange: String((Math.random() - 0.5) * 10),
    percentChange: String((Math.random() - 0.5) * 5),
    marketCap: String(Math.floor(Math.random() * 10000000000)),
    country: countries[Math.floor(Math.random() * countries.length)],
    ipoYear: Math.floor(2000 + Math.random() * 23),
    volume: Math.floor(Math.random() * 1000000),
    sector: sectors[Math.floor(Math.random() * sectors.length)],
    industry: "Various",
    status: statuses[Math.floor(Math.random() * statuses.length)],
    aiInsight: "AI generated insight about the company performance and potential.",
    about: "This is a mock company description generated for demonstration purposes."
  }));
}

export const storage = new MemStorage();