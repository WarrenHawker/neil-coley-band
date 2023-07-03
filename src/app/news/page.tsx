'use client';

import NewsPost from '@/components/newsPost';
import { IContentfulNewsPost, INewsPost } from '@/lib/interfaces';
import { useEffect, useState } from 'react';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { contentfulClient } from '@/lib/functions';

const News = () => {
  const [posts, setPosts] = useState<INewsPost[]>([]);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  useEffect(() => {
    getEntries();
  }, []);

  const getEntries = async () => {
    const response = await contentfulClient.getEntries({
      content_type: 'newsPost',
      //@ts-expect-error
      order: '-sys.createdAt',
    });
    const data: Array<IContentfulNewsPost> = response.items as [];
    setPosts(
      data.map((item: IContentfulNewsPost) => {
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
  };

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
    <>
      <main>
        <h1 className="page-title">News and Events</h1>
        <section className="posts-container">
          {posts.map((post) => (
            <NewsPost key={post.id} post={post} focusPost={focusPost} />
          ))}
        </section>
      </main>
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
    </>
  );
};

export default News;
