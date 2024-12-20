import { useState } from "react";
import { Image } from "./model";
import { ImageModal } from "./modal";
import { Headline } from "../ui-components/headline";

export interface GalleryProps {
  images?: Image[];
}

export const Gallery = ({ images }: GalleryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    if (images) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    }
  };

  return (
    <div className="@[1024px]/main:w-11/12 w-full bg-stone-200 bg-opacity-75 p-4 list-none flex flex-col shadow-slate-500 shadow-sm rounded-md m-auto">
      <Headline>Impressionen</Headline>
      <div className="flex items-center justify-center gap-4 mt-6">
        {images?.map((image, index) => (
          <div className="" key={index} onClick={() => openModal(index)}>
            <img
              className="h-[256px] object-contain cursor-pointer transition-opacity duration-300 hover:opacity-80"
              src={`/assets/${image.src}`}
              alt={image.alt}
            />
          </div>
        ))}
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={images ? images[currentImageIndex] : undefined}
        nextImage={nextImage}
        prevImage={prevImage}
      />
    </div>
  );
};
