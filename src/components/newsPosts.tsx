'use client';

import { INewsPost } from '@/lib/interfaces';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useState } from 'react';
import Overlay from './Overlay';
import NewsPost from './singleNewsPost';

interface NewsPostProps {
  newsPosts: INewsPost[];
}

const NewsPosts = ({ newsPosts }: NewsPostProps) => {
  const [posts, setPosts] = useState(newsPosts);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [focusedPost, setFocusedPost] = useState<INewsPost | null>(null);

  const focusPost = (element: any, id: string) => {
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
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <main className="news-posts">
      <section className="posts">
        <div className="posts-container">
          {posts.map((post, index) => {
            const lastPost = posts.length - 1;
            return (
              <>
                <div
                  className={
                    index == lastPost ? 'headline-post last' : 'headline-post'
                  }
                  key={post.id}
                >
                  <div className="headline-post-text">
                    <h3>{post.title}</h3>
                    <div>{documentToReactComponents(post.body)}</div>
                  </div>
                  <img src={post.thumbnail ? post.thumbnail : 'logo.png'} />
                </div>
                <div
                  className={
                    post.focused
                      ? 'headline-post-mobile focused'
                      : 'headline-post-mobile'
                  }
                >
                  <NewsPost key={post.id} post={post} focusPost={focusPost} />
                  {post.focused && (
                    <Overlay
                      isOpen={showOverlay}
                      setIsOpen={setShowOverlay}
                      header={
                        focusedPost ? (
                          <h1 className="focused-post-title">
                            {focusedPost.title}
                          </h1>
                        ) : null
                      }
                    >
                      {focusedPost ? (
                        <article className="focused-post">
                          <div className="post-image">
                            <img
                              src={
                                focusedPost.thumbnail
                                  ? focusedPost.thumbnail
                                  : 'logo.png'
                              }
                            />
                          </div>
                          <div className="post-body">
                            {documentToReactComponents(focusedPost.body)}
                          </div>
                        </article>
                      ) : null}
                    </Overlay>
                  )}
                </div>
              </>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default NewsPosts;
