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

export const Winery = ({ winery, wineries, showOverlay }: WineryProps) => {
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
          <div className="country">
            <div className={`fi fib fi-${wineryToUse.country}`}></div>
          </div>
        </div>
        <div className="impressions mt-16">
          <img
            className="w-96 object-contain"
            src={"/assets/" + wineryToUse.winery}
            alt={`${wineryToUse.name} winery`}
            onClick={() => showOverlay("/assets/" + wineryToUse.winery)}
          />
        </div>
      </div>
    )
  );
};
