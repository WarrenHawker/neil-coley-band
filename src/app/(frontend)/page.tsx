import Carousel from '@/app/(frontend)/components/carousel';
import { contentfulClient, getFullDate, getGigDate } from '@/lib/functions';
import {
  IContentfulHomeText,
  IContentfulNewsPost,
  IGig,
  IHomeText,
} from '@/lib/interfaces';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const fetchText = async () => {
  const res = await contentfulClient.getEntries({
    content_type: 'homepageText',
  });

  const data: Array<IContentfulHomeText> = res.items as [];

  const today = new Date();

  const text: IHomeText = data.map((item: IContentfulHomeText) => {
    if (item.fields.homepageGig) {
      if (item.fields.homepageGig.fields.dateTime) {
        const homepageGigDate = new Date(
          item.fields.homepageGig.fields.dateTime
        );
        if (homepageGigDate > today) {
          return {
            section1: item.fields.section1,
            homepageImage: item.fields.homepageImage.fields.file.url,
            section2: item.fields.section2,
            homepageGig: {
              id: item.fields.homepageGig.sys.id,
              title: item.fields.homepageGig.fields.title,
              description: item.fields.homepageGig.fields.body,
              location: item.fields.homepageGig.fields.location,
              dateTime: item.fields.homepageGig.fields.dateTime,
              imageURL:
                item.fields.homepageGig.fields.thumbnail?.fields.file.url || '',
              ticketURL: item.fields.homepageGig.fields.ticketUrl,
            },
          };
        } else
          return {
            section1: item.fields.section1,
            homepageImage: item.fields.homepageImage.fields.file.url,
            section2: item.fields.section2,
          };
      } else
        return {
          section1: item.fields.section1,
          homepageImage: item.fields.homepageImage.fields.file.url,
          section2: item.fields.section2,
        };
    } else
      return {
        section1: item.fields.section1,
        homepageImage: item.fields.homepageImage.fields.file.url,
        section2: item.fields.section2,
      };
  })[0];

  return text;
};

const fetchNextGig = async () => {
  //@ts-expect-error
  const res = await contentfulClient.getEntries({
    content_type: 'newsPost',
    'fields.dateTime[gte]': new Date().toISOString(),
    'fields.isGig': true,
    order: 'fields.dateTime',
    limit: 1,
  });

  const data: Array<IContentfulNewsPost> = res.items as [];
  const gigs: IGig[] = data.map((item: IContentfulNewsPost) => {
    return {
      id: item.sys.id,
      title: item.fields.title,
      description: item.fields.body,
      location: item.fields.location,
      dateTime: item.fields.dateTime,
      imageURL: item.fields.thumbnail?.fields.file.url || '',
      ticketURL: item.fields.ticketUrl,
      focused: false,
    };
  });
  return gigs[0];
};

const Home = async () => {
  const textsData = await fetchText();
  const gigData = await fetchNextGig();

  const [text, gig] = await Promise.all([textsData, gigData]);

  let shownGig: IGig = text.homepageGig || gig;

  return (
    <main>
      <Carousel />
      <section className="home-content">
        <div className="welcome-mobile">
          <h1>Welcome to the Neil Coley Band</h1>
        </div>
        <div className="authentic">
          <span className="authentic--text">
            {documentToReactComponents(text.section1)}

            <a className="home-button" href="/music">
              Listen
            </a>
          </span>

          <img src={text.homepageImage} />
        </div>
        <div className="home-calendar">
          <span className="calendar--text">
            {documentToReactComponents(text.section2)}
          </span>
          <span className="next-gig">
            {gig ? (
              <>
                <h2>Our next gig will be:</h2>
                <h3>{shownGig.title}</h3>
                <h4>
                  {getFullDate(shownGig.dateTime)
                    ? getFullDate(shownGig.dateTime)
                    : 'Date TBC'}
                </h4>
                <h4>
                  {shownGig.dateTime
                    ? getGigDate(shownGig.dateTime).time
                    : 'Time TBC'}
                </h4>
                <p>{shownGig.location ? shownGig.location : 'Location TBC'}</p>
                {shownGig.ticketURL ? (
                  <a
                    className="home-button"
                    href={shownGig.ticketURL}
                    target="_blank"
                  >
                    Book Tickets
                  </a>
                ) : (
                  <a className="home-button" href="/news">
                    More Information
                  </a>
                )}
              </>
            ) : (
              <h2>
                I'm sorry, we don't have any gigs planned. Stay tuned for more
                information.
              </h2>
            )}
          </span>
        </div>
      </section>
    </main>
  );
};

export default Home;
