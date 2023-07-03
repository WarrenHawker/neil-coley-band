import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// import "swiper/css/effect-fade";
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import { EffectFade, Autoplay, Pagination, Navigation } from "swiper";
import { Autoplay, Pagination, Navigation } from 'swiper';

import { ICarousel } from '@/lib/interfaces';

interface CarouselProps {
  carouselPhotos: ICarousel[];
}

const Carousel: React.FC<CarouselProps> = ({ carouselPhotos }) => {
  return (
    <Swiper
      spaceBetween={30}
      // effect={"fade"}
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
      // modules={[EffectFade, Autoplay, Pagination, Navigation]}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {carouselPhotos.map((photo) => (
        <SwiperSlide key={photo.id}>
          <div className="carousel-photo">
            <img src={photo.photoURL} alt={photo.name} loading="lazy" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
