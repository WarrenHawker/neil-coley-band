import NewsPost from '@/components/newsPost';
import { IContentfulNewsPost, INewsPost } from '@/misc/interfaces';
import { createClient } from 'contentful';
import { useEffect, useState } from 'react';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

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
  const response = await client.getEntries({
    content_type: 'newsPost',
    //@ts-expect-error
    order: '-sys.createdAt',
  });

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
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  useEffect(() => {
    setPosts(
      newsPosts.map((item: IContentfulNewsPost) => {
        return {
          id: item.sys.id,
          createdDate: item.sys.createdAt,
          title: item.fields.title,
          body: item.fields.body,
          thumbnail: item.fields.thumbnail?.fields.file.url,
          slug: item.fields.slug,
          focused: false,
        };
      })
    );
  }, [newsPosts]);

  const focusPost = (id: string) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id == id) {
          return { ...post, focused: true };
        } else {
          return { ...post, focused: false };
        }
      });
    });
    setShowOverlay(true);
  };

  return (
    <main>
      <h1>News and Events</h1>
      <section className="posts-container">
        {posts.map((post) => (
          <NewsPost key={post.id} post={post} focusPost={focusPost} />
        ))}
      </section>

      <div
        className={showOverlay ? 'overlay visible' : 'overlay'}
        onClick={() => setShowOverlay(false)}
      >
        <article className="focused-post" onClick={(e) => e.stopPropagation()}>
          {posts
            .filter((post) => post.focused == true)
            .map((post) => (
              <div key={post.id}>
                <h1 className="focused-post-title">
                  <FontAwesomeIcon
                    icon={faWindowClose}
                    id="overlay-close"
                    onClick={() => setShowOverlay(false)}
                  />{' '}
                  {post.title}
                </h1>
                <div className="post-image">
                  <img src={post.thumbnail ? post.thumbnail : 'logo.png'} />
                </div>
                <div className="post-body">
                  {documentToReactComponents(post.body)}
                </div>
              </div>
            ))}
        </article>
      </div>
    </main>
  );
};

export default News;
