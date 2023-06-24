import { INewsPost, RichText } from '@/misc/interfaces';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, Inline, Block } from '@contentful/rich-text-types';
import { ReactNode } from 'react';

interface NewsPostProps {
  post: INewsPost;
}

const Bold = ({ children }: RichText) => <p className="pink">{children}</p>;
const Text = ({ children }: RichText) => <p className="center">{children}</p>;

const NewsPost = ({ post }: NewsPostProps) => {
  console.log(post.body);

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: ReactNode) => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: Inline | Block, children: any) => (
        <Text>{children}</Text>
      ),
    },
  };
  return (
    <>
      <h3>{post.title}</h3>
      {documentToReactComponents(post.body, options)}
    </>
  );
};

export default NewsPost;
