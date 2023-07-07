'use client';

import Carousel from '@/components/carousel';
import { contentfulClient } from '@/lib/functions';
import { IContentfulCarousel } from '@/lib/interfaces';
import { useState, useEffect } from 'react';

export default function Home() {
  const [carouselPhotos, setCarouselPhotos] = useState<any[]>([]);

  useEffect(() => {
    getEntries();
  }, []);

  const getEntries = async () => {
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
    <main>
      <Carousel carouselPhotos={carouselPhotos} />
      <section className="home-content">
        <div className='welcome-mobile'><h1>Welcome to the Neil Coley Band</h1></div>
        <div className="authentic">
          <span className="authentic--text">
            <h2>“One of the finest authentic Swing Bands in the Midlands”</h2>
            <p>
              For over a quarter of a century the Neil Coley Big Band has been
              entertaining audiences across the West Midlands. Working with
              nationally acclaimed vocalists, the band brings to life the golden
              era of Big Band Music, featuring such household names as Glenn
              Miller, Louis Armstrong, Ella Fitzgerald, Frank Sinatra, right up
              to present day stars such as Michael Bublé and Adele. Over the
              years the band has covered a wide repertoire covering everything
              from traditional jazz to latin, funk, soul, and rock. Recently the
              band has been developing an exciting new sound, with a blend of
              upbeat arrangements of classic tracks and the best of modern big
              band writing, designed to appeal to a contemporary audience.
            </p>
            <a className="home-button" href="/music">
              Listen
            </a>
          </span>
          <span className="placeholder">Image goes here</span>
        </div>
        <div className="home-calendar">
          <span className="calendar--text">
            <h2>Come Hear Us Play</h2>
            <p>
              We’re based on the western edge of Birmingham, and over the years
              we’ve played in many venues in the Black Country, Worcestershire,
              Shropshire, Staffordshire and Herefordshire. We give regular
              concerts, both indoors (most of the year) and outdoors in the
              Summer. Click on the link below to check out our upcoming public
              concerts. In addition to the full 17 piece big band, we also run a
              small 10 piece function band. Either the big band or the function
              band are available at very reasonable prices. You’ll be surprised!
              If you would like us to come and play for you, click here.
            </p>
          </span>
          <span className="placeholder">
            <h4>Our next gig will be:</h4>
            <a className="home-button" href="/news">
              Book
            </a>
          </span>
        </div>
      </section>
    </main>
  );
}
