import { useNavigate, useParams } from "react-router";
import "./winery.css";
import { Image } from "../image-viewer/model";
import { Gallery } from "../image-viewer/gallery";
import YoutubeEmbed from "../youtube-viewer/youtube-viewer";
import YoutubeEmbedReact from "../youtube-viewer-react/youtube-viewer-react";
import ImageModal from "../image-viewer/modal";

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
  details: {
    label: string;
    value: string;
  }[];
  videoId: string;
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
        <div className="winery @[1024px]/main:w-[95%] w-full bg-stone-100 bg-opacity-75 p-4 list-none flex flex-col shadow-slate-500 shadow-sm rounded-md gap-8">
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
          <hr className="h-[1px] bg-stone-400 border-none"></hr>
          <div className="grid grid-cols-12 gap-4">
            {/* <div className="@[1024px]/main:col-span-6 col-span-12">
              <ul>
                {winery?.details?.map((detail) => {
                  return (
                    <li className="grid grid-cols-12 border-b border-stone-700 p-4">
                      <div className="@[1024px]/main:col-span-3 col-span-12 font-bold">
                        {detail.label}
                      </div>
                      <div className="@[1024px]/main:col-span-9 col-span-12 @[1024px]/main:text-right">
                        {detail.value}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div> */}
            {wineryToUse.map_image && (
              <div className="col-span-12 flex justify-center">
                <img
                  src={
                    "/assets/wineries/" +
                    wineryToUse.key +
                    "/" +
                    wineryToUse.map_image
                  }
                  alt={`${wineryToUse.name} Logo`}
                  className="object-contain rounded-lg"
                />
              </div>
            )}
          </div>
          {wineryToUse.videoId && (
            <>
              {" "}
              <hr className="h-[1px] bg-stone-400 border-none"></hr>
              <YoutubeEmbedReact
                embedId={wineryToUse.videoId}
              ></YoutubeEmbedReact>
            </>
          )}
        </div>

        {impressions && impressions.length > 0 && (
          <Gallery
            images={impressions}
            allItemRoute={`/winery/gallery/${wineryToUse.id}`}
          ></Gallery>
        )}
      </div>
    )
  );
};
