import { INewsPost } from '@/misc/interfaces';

interface NewsPostProps {
  post: INewsPost;
}

const NewsPostFocused = ({ post }: NewsPostProps) => {
  return (
    <article className="focused-post">
      <h1>{post.title}</h1>
      <div className="post-image">
        <img src={post.thumbnail ? post.thumbnail : 'logo.png'} />
      </div>
    </article>
  );
};

export default NewsPostFocused;
