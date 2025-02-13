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

const sectorGradients = {
  "Technology": "from-blue-400/40 via-indigo-400/40 to-purple-400/40",
  "Healthcare": "from-emerald-400/40 via-teal-400/40 to-cyan-400/40",
  "Finance": "from-blue-400/40 via-sky-400/40 to-indigo-400/40",
  "Energy": "from-amber-400/40 via-orange-400/40 to-yellow-400/40",
  "Consumer": "from-pink-400/40 via-rose-400/40 to-red-400/40",
};

export default function CompanyCard({ company, onClick }: CompanyCardProps) {
  const SectorIcon = getSectorIcon(company.sector);
  const gradientClass = sectorGradients[company.sector as keyof typeof sectorGradients] || "from-blue-400/40 via-indigo-400/40 to-purple-400/40";

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
        className="relative p-6 cursor-pointer transition-all duration-300 bg-white hover:shadow-lg overflow-hidden border border-gray-100"
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className={`w-full h-full bg-gradient-to-r ${gradientClass}`} />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <motion.div 
                className="p-3 rounded-xl bg-gray-50 shadow-sm group-hover:shadow transition-all duration-300"
                whileHover={{ rotate: 10 }}
              >
                <SectorIcon className="w-6 h-6 text-gray-700" />
              </motion.div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">{company.symbol}</h3>
                  <Badge variant="outline" className="ml-2">{company.country}</Badge>
                </div>
                <p className="text-gray-600 text-sm">{company.name}</p>
              </div>
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
              <p className="text-sm text-gray-500 mb-1">Sector</p>
              <p className="font-medium text-gray-900">{company.sector}</p>
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