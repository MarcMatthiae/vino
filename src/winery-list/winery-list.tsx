import { Winery } from "../winery/winery";
import "./winery-list.css";

export interface WineryListProps {
  wineries: Winery[];
  showOverlay: (imgSrc: string) => void;
}

export interface Winery {
  id: number;
  key: string;
  name: string;
  logo: string;
  winery: string;
  country: string;
  country_name: string;
}

export const WineryList = ({ wineries, showOverlay }: WineryListProps) => {
  return (
    <ul className="winery-list w-full">
      {wineries.map((winery) => (
        <Winery winery={winery} showOverlay={showOverlay}></Winery>
      ))}
    </ul>
  );
};
