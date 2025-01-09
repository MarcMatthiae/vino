import { Image } from "./model";
import { Headline } from "../ui-components/headline";
import { useNavigate } from "react-router";

export interface GalleryProps {
  images?: Image[];
  allItemRoute: string;
}

export const Gallery = ({ images, allItemRoute }: GalleryProps) => {
  const navigate = useNavigate();
  return (
    <div className="@[1024px]/main:w-[95%] w-full  bg-stone-100 bg-opacity-75 p-4 list-none flex flex-col shadow-slate-500 shadow-sm rounded-md m-auto">
      <div className="flex @[1024px]/main:flex-row flex-col @[1024px]/main:gap-8 gap-2">
        <Headline>Impressionen</Headline>
        <button
          className="bg-emerald-300 p-2 rounded-md border-stone-700 border hover:bg-emerald-700 hover:text-white"
          onClick={() => navigate(allItemRoute)}
        >
          Alle Bilder auf einer Seite
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 mt-6">
        {images?.map((image, index) => (
          <div className="">
            <img
              className="object-contain cursor-pointer transition-opacity duration-300"
              src={image.src}
              alt={image.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
