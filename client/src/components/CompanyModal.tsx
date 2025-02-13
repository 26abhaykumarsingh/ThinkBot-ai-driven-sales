import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Company } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";
import { getSectorIcon } from "./SectorIcons";

interface CompanyModalProps {
  company: Company | null;
  onClose: () => void;
}

export default function CompanyModal({ company, onClose }: CompanyModalProps) {
  if (!company) return null;

  const SectorIcon = getSectorIcon(company.sector);

  return (
    <Dialog open={!!company} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <motion.div 
                className="p-4 bg-primary/10 rounded-2xl"
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <SectorIcon className="w-10 h-10 text-primary" />
              </motion.div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  {company.name}
                </h2>
                <p className="text-xl text-gray-600">{company.symbol}</p>
              </div>
            </div>

            <motion.div 
              className="grid grid-cols-2 gap-8 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-6">
                <div className="bg-primary/5 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Last Sale</p>
                  <p className="text-2xl font-medium">${company.lastSale}</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Net Change</p>
                  <p className={`text-2xl font-medium ${Number(company.netChange) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Number(company.netChange) > 0 ? '+' : ''}{company.netChange}
                  </p>
                </div>
                <div className="bg-primary/5 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Market Cap</p>
                  <p className="text-2xl font-medium">${(Number(company.marketCap) / 1e9).toFixed(2)}B</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-primary/5 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Volume</p>
                  <p className="text-2xl font-medium">{company.volume?.toLocaleString()}</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">IPO Year</p>
                  <p className="text-2xl font-medium">{company.ipoYear}</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Country</p>
                  <p className="text-2xl font-medium">{company.country}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-primary/10">
                <h3 className="text-xl font-semibold mb-3">About</h3>
                <p className="text-gray-600 leading-relaxed">{company.about}</p>
              </div>

              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-primary/10">
                <h3 className="text-xl font-semibold mb-3">AI Insight</h3>
                <p className="text-gray-600 leading-relaxed">{company.aiInsight}</p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}