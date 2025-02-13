import { IconType } from "react-icons";
import { 
  SiFigma,
  SiApollographql,
  SiCoinbase,
  SiTesla,
  SiShopify
} from "react-icons/si";

const sectorToIcon: Record<string, IconType> = {
  "Technology": SiFigma,
  "Healthcare": SiApollographql,
  "Finance": SiCoinbase,
  "Energy": SiTesla,
  "Consumer": SiShopify
};

export function getSectorIcon(sector: string): IconType {
  return sectorToIcon[sector] || SiFigma;
}