import { useParams } from "react-router";
import "./winery.css";
import { Image } from "../image-viewer/model";
import { Gallery } from "../image-viewer/gallery";

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
  impressions: Image[];
  country: string;
  country_name: string;
}

export const Winery = ({ winery, wineries }: WineryProps) => {
  const { wineryId = "" } = useParams();
  const wineryToUse =
    winery || wineries?.find((winery) => winery.id === Number(wineryId));

  return (
    wineryToUse && (
      <div className="flex flex-col gap-2">
        <div className="winery @[1024px]/main:w-11/12 w-full bg-stone-200 bg-opacity-75 p-4 list-none flex flex-col shadow-slate-500 shadow-sm rounded-md">
          <div className="name">
            <div className="flex items-center gap-6">
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
        </div>
        <Gallery images={winery?.impressions}></Gallery>
      </div>
    )
  );
};
