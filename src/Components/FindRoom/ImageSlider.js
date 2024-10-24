import React, { useState } from 'react';

export default function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto"> 
      <div className="h-[400px] w-full overflow-hidden rounded-md bg-indigo-50 flex justify-center items-center">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="h-full w-auto rounded-md shadow-lg object-contain"
        />
      </div>
      {/* Previous Button */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-indigo-800 text-white p-2 rounded-full shadow-md hover:scale-105 transition-all"
        onClick={goToPrevious}
      >
        &#10094;
      </button>
      {/* Next Button */}
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-indigo-800 text-white p-2 rounded-full shadow-md hover:scale-105 transition-all"
        onClick={goToNext}
      >
        &#10095;
      </button>
    </div>
  );
}
