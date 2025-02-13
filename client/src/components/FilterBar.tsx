import { CompanyStatus } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface FilterBarProps {
  currentFilter: string | undefined;
  onFilterChange: (filter: string | undefined) => void;
}

export default function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 justify-center"
    >
      <Button
        variant={!currentFilter ? "default" : "outline"}
        onClick={() => onFilterChange(undefined)}
      >
        All
      </Button>
      {Object.values(CompanyStatus).map((status) => (
        <Button
          key={status}
          variant={currentFilter === status ? "default" : "outline"}
          onClick={() => onFilterChange(status)}
        >
          {status}
        </Button>
      ))}
    </motion.div>
  );
}
