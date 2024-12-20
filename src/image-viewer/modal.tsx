import React from "react";
import { Image } from "./model";

export interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image?: Image;
  nextImage: () => void;
  prevImage: () => void;
}

export const ImageModal = ({
  isOpen,
  onClose,
  image,
  nextImage,
  prevImage,
}: ImageModalProps) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    image && (
      <div
        className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 overflow-auto h-lvh"
        //style={{ top: `${window.scrollY}px` }}
        onClick={onClose}
      >
        <img
          className="object-contain max-w-[90%] max-h-[90%] m-auto"
          src={`/assets/${image.src}`}
          alt={image.alt}
        />
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-emerald-300 text-[64px] min-w-20 text-left"
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
        >
          &#10094;
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-emerald-300 text-[64px] min-w-20 text-right"
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
        >
          &#10095;
        </button>
        <button
          className="absolute top-0 right-2 text-white hover:text-red-300 text-[64px] min-w-20 flex items-center justify-center"
          onClick={onClose}
        >
          &#10005;
        </button>
      </div>
    )
  );
};

export default ImageModal;
