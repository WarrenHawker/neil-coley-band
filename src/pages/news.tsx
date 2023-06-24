import NewsPost from '@/components/newsPost';
import { IContentfulNewsPost, INewsPost } from '@/misc/interfaces';
import { createClient } from 'contentful';
import { useEffect, useState } from 'react';

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
  const response = await client.getEntries({ content_type: 'newsPost' });

  return {
    props: {
      newsPosts: response.items,
    },
  };
};

interface NewsPageProps {
  newsPosts: IContentfulNewsPost[];
}

const News = ({ newsPosts }: NewsPageProps) => {
  const [posts, setPosts] = useState<INewsPost[]>([]);
  console.log(posts);

  useEffect(() => {
    setPosts(
      newsPosts.map((item: IContentfulNewsPost) => {
        return {
          id: item.sys.id,
          createdDate: item.sys.createdAt,
          title: item.fields.title,
          body: item.fields.body,
          thumbnail: item.fields.thumbnail.fields.file.url,
          slug: item.fields.slug,
        };
      })
    );
  }, [newsPosts]);
  return (
    <>
      <h1>News and Events</h1>
      {posts.map((post) => (
        <NewsPost key={post.id} post={post} />
      ))}
    </>
  );
};

export default News;
