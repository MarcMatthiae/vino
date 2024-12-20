import React, { useEffect, useRef, useState } from "react";
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
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position
      scrollPositionRef.current = window.scrollY;

      // Prevent background scrolling
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      // Restore scroll position after modal closes
      document.body.style.position = "";
      document.body.style.top = "";

      // Restore the scroll position using the saved value in the ref
      window.scrollTo(0, scrollPositionRef.current);
    }

    // Cleanup when the component unmounts
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
    };
  }, [isOpen]);

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    image && (
      <div
        className="absolute inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 overflow-auto h-lvh"
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
