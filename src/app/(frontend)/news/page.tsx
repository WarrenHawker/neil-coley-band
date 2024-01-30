import { IContentfulNewsPost, INewsPost } from '@/lib/interfaces';
import { contentfulClient } from '@/lib/functions';
import NewsPosts from '@/app/(frontend)/components/newsPosts';

const fetchPosts = async () => {
  const res = await contentfulClient.getEntries({
    content_type: 'newsPost',
    //@ts-expect-error
    order: '-sys.updatedAt',
  });
  const data: Array<IContentfulNewsPost> = res.items as [];
  const posts: INewsPost[] = data.map((item: IContentfulNewsPost) => {
    return {
      id: item.sys.id,
      createdDate: item.sys.createdAt,
      updatedDate: item.sys.updatedAt,
      title: item.fields.title,
      body: item.fields.body,
      thumbnail: item.fields.thumbnail?.fields.file.url,
      slug: item.fields.slug,
      focused: false,
    };
  });
  return posts;
};

const News = async () => {
  const posts = await fetchPosts();

  return (
    <>
      <h1 className="page-title">News and Events</h1>
      <NewsPosts newsPosts={posts} />
    </>
  );
};

export default News;
