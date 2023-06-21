import Carousel from '@/components/carousel';
import { ICarousel, IContentfulCarousel } from '@/misc/interfaces';
import { createClient } from 'contentful';
import { useState, useEffect } from 'react';

export const getStaticProps = async () => {
  //checks to see if environment variables are loaded
  if (!process.env.SPACE_ID) {
    throw new Error('contentful SPACE_ID is missing');
  }
  if (!process.env.ACCESS_TOKEN) {
    throw new Error('contentful ACCESS_TOKEN is missing');
  }

  //create new instance of contentful client using api key data (see .env.local file)
  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  });

  //get band members from contentful
  const response = await client.getEntries({ content_type: 'carousel' });

  return {
    props: {
      carousel: response.items,
    },
  };
};

interface HomePageProps {
  carousel: IContentfulCarousel[];
}

export default function Home({ carousel }: HomePageProps) {
  const [carouselPhotos, setCarouselPhotos] = useState<ICarousel[]>([]);

  useEffect(() => {
    const newCarousel: ICarousel[] = carousel.map((item, index) => {
      return {
        id: item.sys.id,
        name: item.fields.name,
        photoURL: item.fields.photo.fields.file.url,
        position: index + 1,
      };
    });
    setCarouselPhotos(newCarousel);
  }, [carousel]);

  return (
    <main>
      <h1>Welcome to the Neil Coley Big Band</h1>
      <Carousel carouselPhotos={carouselPhotos} />
    </main>
  );
}
