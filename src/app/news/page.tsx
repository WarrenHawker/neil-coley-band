'use client';

import NewsPost from '@/components/newsPost';
import { IContentfulNewsPost, INewsPost } from '@/lib/interfaces';
import { useEffect, useState } from 'react';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { contentfulClient } from '@/lib/functions';
import Overlay from '@/components/Overlay';

const News = () => {
  const [posts, setPosts] = useState<INewsPost[]>([]);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [focusedPost, setFocusedPost] = useState<INewsPost | null>(null);

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
    setFocusedPost(posts.filter((post) => post.id == id)[0]);
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
        <Overlay
          isOpen={showOverlay}
          setIsOpen={setShowOverlay}
          header={
            focusedPost ? (
              <h1 className="focused-post-title">{focusedPost.title}</h1>
            ) : null
          }
        >
          {focusedPost ? (
            <article className="focused-post">
              <div className="post-image">
                <img
                  src={
                    focusedPost.thumbnail ? focusedPost.thumbnail : 'logo.png'
                  }
                />
              </div>
              <div className="post-body">
                {documentToReactComponents(focusedPost.body)}
              </div>
            </article>
          ) : null}
        </Overlay>
      </main>
    </>
  );
};

export default News;
