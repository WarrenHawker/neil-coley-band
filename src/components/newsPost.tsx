import { trimString } from '@/misc/functions';
import { INewsPost, RichText } from '@/misc/interfaces';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { BLOCKS, MARKS, Inline, Block } from '@contentful/rich-text-types';
import { ReactNode } from 'react';

interface NewsPostProps {
  post: INewsPost;
  focusPost: (id: string) => void;
}

const NewsPost = ({ post, focusPost }: NewsPostProps) => {
  return (
    <article className="post" onClick={() => focusPost(post.id)}>
      <h3 className="post-title">{post.title}</h3>
      <div className="post-thumbnail">
        <img src={post.thumbnail ? post.thumbnail : 'logo.png'} />
      </div>
      {/* {documentToReactComponents(post.body)} */}
      <p className="post-excerpt">
        {trimString(documentToPlainTextString(post.body), 80)}...
        <span className="learn-more">Learn more</span>
      </p>
    </article>
  );
};

export default NewsPost;
