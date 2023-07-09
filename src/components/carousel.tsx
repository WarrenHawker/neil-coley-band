'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper';
// import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper';

import { IContentfulCarousel } from '@/lib/interfaces';
import { contentfulClient } from '@/lib/functions';

const Carousel = () => {
  const [carouselPhotos, setCarouselPhotos] = useState<any[]>([]);

  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = async () => {
    const response = await contentfulClient.getEntries({
      content_type: 'carousel',
    });
    const data: Array<IContentfulCarousel> = response.items as [];
    setCarouselPhotos(
      data.map((item: IContentfulCarousel, index: number) => {
        return {
          id: item.sys.id,
          name: item.fields.name,
          photoURL: item.fields.photo.fields.file.url,
          position: index + 1,
        };
      })
    );
  };

  return (
    <Swiper
      spaceBetween={30}
      effect={'fade'}
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
      modules={[EffectFade, Autoplay, Pagination, Navigation]}
      // modules={[Autoplay, Pagination, Navigation]}
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
