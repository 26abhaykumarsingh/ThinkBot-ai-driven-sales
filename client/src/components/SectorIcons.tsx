import { IconType } from "react-icons";
import { 
  SiApple,  // Technology
  SiAbbvie,  // Healthcare
  SiCoinbase,  // Finance
  SiTesla,  // Energy
  SiAmazon  // Consumer
} from "react-icons/si";

const sectorToIcon: Record<string, IconType> = {
  "Technology": SiApple,
  "Healthcare": SiAbbvie,
  "Finance": SiCoinbase,
  "Energy": SiTesla,
  "Consumer": SiAmazon
};

export function getSectorIcon(sector: string): IconType {
  return sectorToIcon[sector] || SiApple;
}