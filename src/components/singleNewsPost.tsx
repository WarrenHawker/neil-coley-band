import { trimString } from '@/lib/functions';
import { INewsPost } from '@/lib/interfaces';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

interface NewsPostProps {
  post: INewsPost;
  focusPost: (element: any, id: string) => void;
}

const NewsPost = ({ post, focusPost }: NewsPostProps) => {
  return (
    <article className="post" onClick={(e) => focusPost(e.target, post.id)}>
      <h3 className="post-title">{post.title}</h3>
      <div className="post-thumbnail">
        <img src={post.thumbnail ? post.thumbnail : 'logo.png'} />
      </div>
      <p className="post-excerpt">
        {trimString(documentToPlainTextString(post.body), 80)}...
        <span className="learn-more">Learn more</span>
      </p>
    </article>
  );
};

export default NewsPost;
