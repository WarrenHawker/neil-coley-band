import MusicVideos from '@/components/musicVideos';
import { contentfulClient } from '@/lib/functions';
import { IContentfulMusic, IContentfulPageText } from '@/lib/interfaces';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const fetchVideos = async () => {
  const res = await contentfulClient.getEntries({
    content_type: 'musicVideos',
    //@ts-expect-error
    order: '-sys.createdAt',
  });
  const data: Array<IContentfulMusic> = res.items as [];
  const videos = data.map((item: IContentfulMusic) => {
    return {
      id: item.sys.id,
      title: item.fields.title,
      videoURL: item.fields.videoUrl,
      description: item.fields.description,
    };
  });
  return videos;
};

const fetchText = async () => {
  const res = await contentfulClient.getEntries({
    content_type: 'musicPageText',
  });
  const data: Array<IContentfulPageText> = res.items as [];
  const text = data.map((item: IContentfulPageText) => {
    return {
      text: item.fields.text,
    };
  })[0];
  return text;
};

const Music = async () => {
  const videosData = fetchVideos();
  const textData = fetchText();

  const [videos, text] = await Promise.all([videosData, textData]);

  return (
    <>
      <h1 className="page-title">Our Music</h1>
      <section className="page-text">
        {documentToReactComponents(text.text)}
      </section>
      <section className="music-videos">
        <MusicVideos videos={videos} />
      </section>
    </>
  );
};

export default Music;
