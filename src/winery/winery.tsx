import { useParams } from "react-router";
import "./winery.css";

export interface WineryProps {
  winery?: WineryData;
  wineries?: WineryData[];
  showOverlay: (imgSrc: string) => void;
}

export interface WineryData {
  id: number;
  key: string;
  name: string;
  logo: string;
  winery: string;
  country: string;
  country_name: string;
}

export const Winery = ({ winery, wineries }: WineryProps) => {
  const { wineryId = "" } = useParams();
  const wineryToUse =
    winery || wineries?.find((winery) => winery.id === Number(wineryId));
  return (
    wineryToUse && (
      <div className="winery @[1024px]/main:w-11/12 w-full bg-stone-200 bg-opacity-75 p-4 list-none flex flex-col shadow-slate-500 shadow-sm rounded-md">
        <div className="name">
          <div className="flex items-center gap-4">
            <img
              src={"/assets/" + wineryToUse.logo}
              alt={`${wineryToUse.name} Logo`}
              className="max-h-20 max-w-40 object-contain"
            />
            <h2 className="text-3xl font-bold text-stone-700">
              {wineryToUse.name}
            </h2>
          </div>
        </div>
        <div className="impressions mt-16 grid grid-cols-2 gap-2">
          <img
            className="col-span-1 object-contain cursor-pointer transition-transform duration-300 ease-in-out group-hover:scale-105"
            src={"/assets/" + wineryToUse.winery}
            alt={`${wineryToUse.name} winery`}
          />
        </div>
      </div>
    )
  );
};
