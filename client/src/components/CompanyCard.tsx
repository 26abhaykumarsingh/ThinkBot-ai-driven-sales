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
  [CompanyStatus.TOP_PROSPECT]: "bg-green-100 text-green-800 border-green-200",
  [CompanyStatus.PROMISING]: "bg-blue-100 text-blue-800 border-blue-200",
  [CompanyStatus.NEEDS_REVIEW]: "bg-yellow-100 text-yellow-800 border-yellow-200",
  [CompanyStatus.LOW_POTENTIAL]: "bg-red-100 text-red-800 border-red-200",
};

// Using a consistent blue-based theme for all sectors
const sectorGradients = {
  "Technology": "from-blue-600/90 to-blue-400/90",
  "Healthcare": "from-blue-500/90 to-sky-400/90",
  "Finance": "from-indigo-500/90 to-blue-400/90",
  "Energy": "from-blue-700/90 to-blue-500/90",
  "Consumer": "from-sky-500/90 to-blue-400/90",
};

export default function CompanyCard({ company, onClick }: CompanyCardProps) {
  const SectorIcon = getSectorIcon(company.sector);
  const gradientClass = sectorGradients[company.sector as keyof typeof sectorGradients] || sectorGradients["Technology"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="group"
    >
      <Card
        onClick={onClick}
        className="relative p-0 cursor-pointer transition-all duration-300 bg-white hover:shadow-lg border border-gray-100 overflow-hidden"
      >
        {/* Gradient header */}
        <div className={`w-full h-16 bg-gradient-to-r ${gradientClass} flex items-center px-6`}>
          <motion.div 
            className="p-2 rounded-lg bg-white/20 backdrop-blur-sm"
            whileHover={{ rotate: 10 }}
          >
            <SectorIcon className="w-6 h-6 text-white" />
          </motion.div>
          <span className="ml-3 text-white font-medium">{company.sector}</span>
        </div>

        {/* Content area */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg">{company.symbol}</h3>
                <Badge variant="outline" className="ml-2">{company.country}</Badge>
              </div>
              <p className="text-gray-600 text-sm">{company.name}</p>
            </div>
            <Badge className={`${statusColors[company.status as CompanyStatus]} border`}>
              {company.status}
            </Badge>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Market Cap</p>
              <p className="font-medium text-gray-900">
                ${(Number(company.marketCap) / 1e9).toFixed(2)}B
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">IPO Year</p>
              <p className="font-medium text-gray-900">{company.ipoYear}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Industry</p>
              <p className="font-medium text-gray-900">{company.industry}</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}