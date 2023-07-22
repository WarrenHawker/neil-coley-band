import {
  IGig,
  IContentfulGig,
  IContentfulNewsPost,
  INewsPost,
} from '@/lib/interfaces';
import { contentfulClient } from '@/lib/functions';
import NewsPosts from '@/components/newsPosts';
import Gigs from '@/components/gigs';

const fetchPosts = async () => {
  const res = await contentfulClient.getEntries({
    content_type: 'newsPost',
    //@ts-expect-error
    order: '-sys.createdAt',
  });
  const data: Array<IContentfulNewsPost> = res.items as [];
  const posts: INewsPost[] = data.map((item: IContentfulNewsPost) => {
    return {
      id: item.sys.id,
      createdDate: item.sys.createdAt,
      title: item.fields.title,
      body: item.fields.body,
      thumbnail: item.fields.thumbnail?.fields.file.url,
      slug: item.fields.slug,
      focused: false,
    };
  });
  return posts;
};

const fetchGigs = async () => {
  //@ts-expect-error
  const res = await contentfulClient.getEntries({
    content_type: 'gig',
    'fields.dateTime[gte]': new Date().toISOString(),
    order: 'fields.dateTime',
  });
  const data: Array<IContentfulGig> = res.items as [];
  const gigs: IGig[] = data.map((item: IContentfulGig) => {
    return {
      id: item.sys.id,
      title: item.fields.title,
      description: item.fields.description,
      location: item.fields.location,
      dateTime: item.fields.dateTime,
      imageURL: item.fields.image.fields.file.url,
      focused: false,
    };
  });
  return gigs;
};

const News = async () => {
  const postsData = fetchPosts();
  const gigsData = fetchGigs();

  const [posts, gigs] = await Promise.all([postsData, gigsData]);

  return (
    <>
      <h1 className="page-title">News and Events</h1>
      <div className="gigs-and-news">
        <Gigs gigPosts={gigs} />
        <NewsPosts newsPosts={posts} />
      </div>
    </>
  );
};

export default News;
