import Carousel from '@/components/carousel';
import { contentfulClient, getFullDate, getGigDate } from '@/lib/functions';
import { IContentfulGig, IContentfulHomeText, IGig } from '@/lib/interfaces';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { faTicket } from '@fortawesome/free-solid-svg-icons';

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

const fetchNextGig = async () => {
  //@ts-expect-error
  const res = await contentfulClient.getEntries({
    content_type: 'gig',
    'fields.dateTime[gte]': new Date().toISOString(),
    order: 'fields.dateTime',
    limit: 1,
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
                <h3>{gig.title}</h3>
                <h4>{getFullDate(gig.dateTime)}</h4>
                <h4>{getGigDate(gig.dateTime).time}</h4>
                <p>{gig.location}</p>
                {gig.ticketURL ? (
                  <a
                    className="home-button"
                    href={gig.ticketURL}
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
      <h3>Today's Date: {new Date().toISOString()}</h3>
    </main>
  );
};

export default Home;
