import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from "swiper";

import { ICarousel } from '@/misc/interfaces';

interface CarouselProps {
  carouselPhotos: ICarousel[];
}

const Carousel: React.FC<CarouselProps> = ({ carouselPhotos }) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      loop={true}
      speed={500}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {carouselPhotos.map((photo) => (
        <SwiperSlide key={photo.id}>
          <div className="carousel-photo">
            <img src={photo.photoURL} alt={photo.name} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
