import Carousel from '@/components/carousel';
import { contentfulClient } from '@/lib/functions';
import { IContentfulHomeText } from '@/lib/interfaces';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const fetchText = async () => {
  const res = await contentfulClient.getEntries({
    content_type: 'homepageText',
  });

  const data: Array<IContentfulHomeText> = res.items as [];

  const text = data.map((item: IContentfulHomeText) => {
    return {
      section1: item.fields.section1,
      homepageImage: item.fields.homepageImage.fields.file.url,
      section2: item.fields.section2,
    };
  })[0];

  return text;
};

const Home = async () => {
  const data = await fetchText();
  return (
    <main>
      <Carousel />
      <section className="home-content">
        <div className="welcome-mobile">
          <h1>Welcome to the Neil Coley Band</h1>
        </div>
        <div className="authentic">
          <span className="authentic--text">
            {documentToReactComponents(data.section1)}

            <a className="home-button" href="/music">
              Listen
            </a>
          </span>
          <span className="placeholder">
            <img src={data.homepageImage} />
          </span>
        </div>
        <div className="home-calendar">
          <span className="calendar--text">
            {documentToReactComponents(data.section2)}
          </span>
          <span className="placeholder">
            <h4>Our next gig will be:</h4>
            <a className="home-button" href="/news">
              Book
            </a>
          </span>
        </div>
      </section>
    </main>
  );
};

export default Home;
