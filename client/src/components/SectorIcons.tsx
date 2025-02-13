import { IconType } from "react-icons";
import { 
  SiApple,
  SiWebmd,
  SiVisa,
  SiTesla,
  SiAmazon
} from "react-icons/si";

const sectorToIcon: Record<string, IconType> = {
  "Technology": SiApple,
  "Healthcare": SiWebmd,
  "Finance": SiVisa,
  "Energy": SiTesla,
  "Consumer": SiAmazon
};

export function getSectorIcon(sector: string): IconType {
  return sectorToIcon[sector] || SiApple;
}