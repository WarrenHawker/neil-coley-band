'use client';


import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import Image from 'next/image';

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
          photoURL: 'https:' + item.fields.photo.fields.file.url,
          position: index + 1,
        };
      })
    );
  };
  const items = carouselPhotos.map((photo) => (
    <div className="item" key={photo.id}>
      <div className="carousel-photo">
        <Image src={photo.photoURL} alt={photo.name} width={1500} height={600}/>
      </div>
    </div>
  ));
  
  const renderPlayPauseButton = ({ isPlaying, play, pause }: any) => {
    return (
      <button className="play-pause-btn" onClick={isPlaying ? pause : play}>
       {isPlaying ? '\u23F8' : '\u25BA'}
      </button>
    );
  };
  
  return (
    <AliceCarousel
      autoPlay
      autoPlayControls
      autoPlayStrategy="none"
      autoPlayInterval={3000}
      animationDuration={500}
      // default animationType is "slide" 
      animationType="fadeout"
      infinite
      touchTracking={true}
      // default button looked bad-can change styling in CSS now
      renderPlayPauseButton={renderPlayPauseButton}
      // default arrows were very small and difficult to see
      renderPrevButton={() => {
        return <span className="prevBtn prev-nextBtn">&lang;</span>
      }}
      renderNextButton={() => {
        return <span className="nextBtn prev-nextBtn">&rang;</span>
      }}
      items={items}
      
    />
  );
};

export default Carousel;
