import { useParams } from "react-router";
import { WineryData } from "../winery/winery";

export interface GallerySingleProps {
  wineries?: WineryData[];
}

export const GallerySingle = ({ wineries }: GallerySingleProps) => {
  const { wineryId = "" } = useParams();
  const wineryToUse = wineries?.find(
    (winery) => winery.id === Number(wineryId)
  );
  const impressions = wineryToUse?.impressions
    ? wineryToUse.impressions.map((impression) => {
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
    <div>
      <div className="flex flex-col items-center justify-center gap-4 mt-6">
        {impressions?.map((image, index) => (
          <div className="">
            <img
              className="object-contain cursor-pointer transition-opacity duration-300 w-full"
              src={image.src}
              alt={image.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
