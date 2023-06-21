import { ICarousel } from '@/misc/interfaces';
import { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';

interface CarouselProps {
  carouselPhotos: ICarousel[];
}

const Carousel = ({ carouselPhotos }: CarouselProps) => {
  const [position, setPosition] = useState<number>(1);

  const prevPhoto = () => {
    setPosition((prevPosition) => {
      if (prevPosition == 1) {
        return carouselPhotos.length;
      } else {
        return prevPosition - 1;
      }
    });
  };

  const nextPhoto = () => {
    setPosition((prevPosition) => {
      if (prevPosition == carouselPhotos.length) {
        return 1;
      } else {
        return prevPosition + 1;
      }
    });
  };

  useInterval(nextPhoto, 3000);

  return (
    <div className="carousel-container">
      <button onClick={prevPhoto}>Prev</button>
      {carouselPhotos.map((photo) => (
        <div
          key={photo.id}
          className={
            photo.position == position
              ? 'carousel-photo active'
              : 'carousel-photo'
          }
        >
          <img src={photo.photoURL} />
          <p>{photo.name}</p>
          <p>{photo.position}</p>
        </div>
      ))}
      <button onClick={nextPhoto}>Next</button>
    </div>
  );
};

export default Carousel;
