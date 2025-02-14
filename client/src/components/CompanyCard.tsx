import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Company, CompanyStatus } from "@shared/schema";
import { getSectorIcon } from "./SectorIcons";
import { industry_sector_mapping } from "@/lib/utils";

interface CompanyCardProps {
  company: Company;
  onClick: () => void;
}

const statusColors = {
  [CompanyStatus.TOP_PROSPECT]: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  [CompanyStatus.PROMISING]: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  [CompanyStatus.NEEDS_REVIEW]: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
  [CompanyStatus.LOW_POTENTIAL]: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
};

// Using a consistent blue-based theme for all sectors
const sectorGradients = {
  "Technology": "from-blue-400/90 to-blue-200/90",
  "Healthcare": "from-blue-400/90 to-sky-200/90",
  "Finance": "from-indigo-400/90 to-blue-200/90",
  "Energy": "from-blue-400/90 to-blue-200/90",
  "Consumer": "from-sky-400/90 to-blue-200/90",
};

export default function CompanyCard({ company, onClick }: CompanyCardProps) {
  const SectorIcon = getSectorIcon(company.sector);
  const gradientClass = sectorGradients[company.sector as keyof typeof sectorGradients] || sectorGradients["Technology"];
  console.log(industry_sector_mapping);

  return (
    <motion.div
      initial={{ opacity: 0.9, y: 20 }}
      animate={{ opacity: 0.9, y: 0 }}
      whileHover={{
        scale: 1.02,
        opacity: 1,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="group"
    >
      <Card
        onClick={onClick}
        className="relative p-0 cursor-pointer transition-all duration-300 bg-white hover:shadow-lg overflow-hidden"
      >
        {/* Gradient header */}
        <div className={`w-full h-1 bg-gradient-to-r ${gradientClass} flex items-center px-6`}>
          {/* <motion.div 
            className="p-2 rounded-lg bg-white/20 backdrop-blur-sm"
            whileHover={{ rotate: 10 }}
          >
            <SectorIcon className="w-6 h-6 text-white" />
          </motion.div> */}
          {/* <span className="ml-3 text-white font-medium">{company.sector}</span> */}
        </div>

        {/* Content area */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center">
              {/* Add company logo */}
              <motion.div
                className="mr-4 rounded-lg bg-white/20 backdrop-blur-sm"
                whileHover={{ rotate: 10 }}
              >
                <img
                  src={company?.logo_url || `${`https://png.pngtree.com/element_our/png/20180918/simple-square-logo-design-png_100145.jpg`}`}
                  alt={`${company.name} logo`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </motion.div>
              <div>
                <p className="text-gray-600 text-lg ml-2 font-bold">{company.name}</p>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">{company.symbol}</h3>
                  <Badge variant="outline" className="">{company.country}</Badge>
                </div>
              </div>
            </div>
            <Badge className={`${statusColors[company?.classification as CompanyStatus]} border`}>
              {company?.classification}
            </Badge>
          </div>

          <hr className="my-4 border-gray-200" />

          <div className="mt-6 grid grid-cols-5 gap-6">
            <div className="relative">
              <p className="text-sm text-gray-500 mb-1">Market Cap</p>
              <p className="font-medium text-gray-900">
                ${(Number(company?.market_capital) / 1e6).toFixed(2)}M
              </p>
              <div className="absolute top-0 right-0 h-full border-r border-gray-200"></div>
            </div>
            <div className="relative">
              <p className="text-sm text-gray-500 mb-1">Revenue</p>
              <p className="font-medium text-gray-900">{company?.revenue + 'M'}</p>
              <div className="absolute top-0 right-0 h-full border-r border-gray-200"></div>
            </div>
            <div className="relative">
              <p className="text-sm text-gray-500 mb-1">Industry</p>
              <p className="font-medium text-gray-900">{company?.industry}</p>
              <div className="absolute top-0 right-0 h-full border-r border-gray-200"></div>
            </div>
            <div className="relative">
              <p className="text-sm text-gray-500 mb-1">Sector</p>
              <p className="font-medium text-gray-900">{industry_sector_mapping[company?.industry]}</p>
              <div className="absolute top-0 right-0 h-full border-r border-gray-200"></div>
            </div>
            <div className="relative">
              <p className="text-sm text-gray-500 mb-1">No. of GCCs</p>
              <p className="font-medium text-gray-900">{company?.no_gccs}</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}