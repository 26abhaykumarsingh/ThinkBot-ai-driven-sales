import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { getSectorIcon } from "./SectorIcons";
import { Badge } from "@/components/ui/badge";
import { industry_sector_mapping } from "@/lib/utils";

interface CompanyModalProps {
  company: any;
  onClose: () => void;
}

const CompanyStatus = {
  TOP_PROSPECT: "Top Prospect",
  PROMISING: "Promising Opportunity",
  NEEDS_REVIEW: "Needs Review",
  LOW_POTENTIAL: "Low Potential"
}

const sectorGradients = {
  "Technology": "from-blue-600/90 to-blue-400/90",
  "Healthcare": "from-blue-500/90 to-sky-400/90",
  "Finance": "from-indigo-500/90 to-blue-400/90",
  "Energy": "from-blue-700/90 to-blue-500/90",
  "Consumer": "from-sky-500/90 to-blue-400/90",
};

const statusColors = {
  [CompanyStatus.TOP_PROSPECT]: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  [CompanyStatus.PROMISING]: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  [CompanyStatus.NEEDS_REVIEW]: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
  [CompanyStatus.LOW_POTENTIAL]: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
};

export default function CompanyModal({ company, onClose }: CompanyModalProps) {
  console.log(company);
  if (!company) return null;

  const SectorIcon = getSectorIcon(company.sector);
  const gradientClass = sectorGradients[company?.sector] || sectorGradients["Technology"];

  return (
    <Dialog open={!!company} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header with gradient */}
            <div className={`w-full h-32 bg-gradient-to-r ${gradientClass} p-8 flex items-center gap-6`}>
              <motion.div
                className="p-4"
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <img className="rounded-full w-20" src={company?.logo_url || `${`https://png.pngtree.com/element_our/png/20180918/simple-square-logo-design-png_100145.jpg`}`} alt="" />
              </motion.div>
              <div className="text-white flex justify-between w-full items-center">
                <h2 className="text-3xl font-bold">
                  {company.name}
                </h2>
                <Badge variant="outline" className="bg-gray-50 h-6 text-black">{industry_sector_mapping[company?.industry]}</Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">About</h3>
                  <p className="text-gray-600 leading-relaxed">{company.about}</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">AI Insight</h3>
                  <div className="flex">
                   
                    <p className="text-gray-600 leading-relaxed"> <Badge className={`${statusColors[company?.classification as CompanyStatus] || 'bg-gray-200'} border mr-2`}>
                      {company?.classification}
                    </Badge>{company.reason}</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="grid grid-cols-2 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Market Capital</p>
                    <p className="text-2xl font-medium">
                      ${(Number(company?.market_capital) / 1e6).toFixed(2)}M
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Country</p>
                    <p className="text-2xl font-medium">{company?.country}</p>
                  </div>
                  {/* <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Net Change</p>
                    <p className={`text-2xl font-medium ${Number(company.netChange) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {Number(company.netChange) > 0 ? '+' : ''}{company.netChange}
                    </p>
                  </div> */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">No. of GCSs</p>
                    <p className="text-2xl font-medium">{company?.no_gccs}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Revenue</p>
                    <p className="text-2xl font-medium">{company?.revenue + 'M'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Industry</p>
                    <p className="text-2xl font-medium">{company?.industry}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Headcount</p>
                    <p className="text-2xl font-medium">{company?.headcount}</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">Hiring Trends</h3>
                  <p className="text-gray-600 leading-relaxed">{company.hiring_trends.replace(/\n/g, ', ')}</p>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}