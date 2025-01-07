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
  map_image: string;
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
  const impressions = winery?.impressions
    ? winery.impressions.map((impression) => {
        return {
          src:
            "/assets/wineries/" +
            wineryToUse?.key +
            "/impressions/" +
            impression.src,
          alt: impression.alt,
        };
      })
    : [];

  return (
    wineryToUse && (
      <div className="flex flex-col gap-2">
        <div className="winery @[1024px]/main:w-[95%] w-full bg-stone-200 bg-opacity-75 p-4 list-none flex flex-col shadow-slate-500 shadow-sm rounded-md gap-8">
          <div>
            <div className="name">
              <div className="flex items-center gap-6">
                <img
                  src={
                    wineryToUse.logo
                      ? "/assets/wineries/" +
                        wineryToUse.key +
                        "/logo/" +
                        wineryToUse.logo
                      : "/assets/favicon.png"
                  }
                  alt={`${wineryToUse.name} Logo`}
                  className="max-h-20 max-w-40 object-contain"
                />
                <h2 className="text-3xl font-bold text-stone-700">
                  {wineryToUse.name}
                </h2>
              </div>
            </div>
          </div>
          {wineryToUse.map_image && (
            <div>
              <hr className="h-0.5 bg-stone-400"></hr>
              <h3 className="text-2xl font-bold text-stone-700 my-4">Lage</h3>
              <img
                src={
                  "/assets/wineries/" +
                  wineryToUse.key +
                  "/" +
                  wineryToUse.map_image
                }
                alt={`${wineryToUse.name} Logo`}
                className="object-contain"
              />
            </div>
          )}
        </div>
        {impressions && impressions.length > 0 && (
          <Gallery images={impressions}></Gallery>
        )}
      </div>
    )
  );
};
