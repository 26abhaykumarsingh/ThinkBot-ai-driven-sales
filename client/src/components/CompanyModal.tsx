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
      <DialogContent className="max-w-2xl">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <SectorIcon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{company.name}</h2>
                <p className="text-gray-600">{company.symbol}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500">Last Sale</p>
                <p className="font-medium">${company.lastSale}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Net Change</p>
                <p className={`font-medium ${Number(company.netChange) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Number(company.netChange) > 0 ? '+' : ''}{company.netChange}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Market Cap</p>
                <p className="font-medium">${(Number(company.marketCap) / 1e9).toFixed(2)}B</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Volume</p>
                <p className="font-medium">{company.volume?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">IPO Year</p>
                <p className="font-medium">{company.ipoYear}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Country</p>
                <p className="font-medium">{company.country}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-gray-600">{company.about}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">AI Insight</h3>
              <p className="text-gray-600">{company.aiInsight}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}