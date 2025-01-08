import { Image } from "./model";
import { Headline } from "../ui-components/headline";

export interface GalleryProps {
  images?: Image[];
}

export const Gallery = ({ images }: GalleryProps) => {
  return (
    <div className="@[1024px]/main:w-[95%] w-full bg-stone-100 bg-opacity-75 p-4 list-none flex flex-col shadow-slate-500 shadow-sm rounded-md m-auto">
      <Headline>Impressionen</Headline>
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
