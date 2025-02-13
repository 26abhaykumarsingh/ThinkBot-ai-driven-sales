import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Company, CompanyStatus } from "@shared/schema";
import { getSectorIcon } from "./SectorIcons";

interface CompanyCardProps {
  company: Company;
  onClick: () => void;
}

const statusColors = {
  [CompanyStatus.TOP_PROSPECT]: "bg-green-100 text-green-800",
  [CompanyStatus.PROMISING]: "bg-blue-100 text-blue-800",
  [CompanyStatus.NEEDS_REVIEW]: "bg-yellow-100 text-yellow-800",
  [CompanyStatus.LOW_POTENTIAL]: "bg-red-100 text-red-800",
};

export default function CompanyCard({ company, onClick }: CompanyCardProps) {
  const SectorIcon = getSectorIcon(company.sector);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        onClick={onClick}
        className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <SectorIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{company.symbol}</h3>
                <Badge variant="outline">{company.country}</Badge>
              </div>
              <p className="text-gray-600">{company.name}</p>
            </div>
          </div>
          <Badge className={statusColors[company.status as CompanyStatus]}>
            {company.status}
          </Badge>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Market Cap</p>
            <p className="font-medium">
              ${(Number(company.marketCap) / 1e9).toFixed(2)}B
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Sector</p>
            <p className="font-medium">{company.sector}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Industry</p>
            <p className="font-medium">{company.industry}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}