'use client';

import { IGig } from '@/lib/interfaces';
import SingleGig from './singleGig';
import { useState } from 'react';
import Overlay from './Overlay';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getFullDate, getGigDate } from '@/lib/functions';

interface GigsProps {
  gigPosts: IGig[];
}

const Gigs = ({ gigPosts }: GigsProps) => {
  const [gigs, setPosts] = useState(gigPosts);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [focusedGig, setFocusedGig] = useState<IGig | null>(null);
  const [showGigs, setShowGigs] = useState<boolean>(false);

  const focusGig = (id: string) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id == id) {
          return { ...post, focused: true };
        } else {
          return { ...post, focused: false };
        }
      });
    });
    setFocusedGig(gigs.filter((gig) => gig.id == id)[0]);
    setShowOverlay(true);
  };

  return (
    <>
      <button
        className={showGigs ? 'gigs-button show' : 'gigs-button'}
        onClick={() => setShowGigs(true)}
      >
        Upcoming Gigs
      </button>
      <aside
        className={showGigs ? 'gigs-container show' : 'gigs-container'}
        onClick={() => setShowGigs(false)}
      >
        <section className={showGigs ? 'gigs show' : 'gigs'}>
          <h2 className={showGigs ? 'gigs-title show' : 'gigs-title'}>
            Upcoming Gigs{' '}
            <button
              className="btn-hide-gigs"
              onClick={() => setShowGigs(false)}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </h2>

          {gigs.map((gig) => (
            <SingleGig key={gig.id} gig={gig} focusGig={focusGig} />
          ))}
        </section>

        <Overlay
          isOpen={showOverlay}
          setIsOpen={setShowOverlay}
          header={
            focusedGig ? (
              <h1 className="focused-post-title">{focusedGig.title}</h1>
            ) : null
          }
        >
          {focusedGig ? (
            <article className="focused-post">
              <div className="post-image">
                <img
                  src={focusedGig.imageURL ? focusedGig.imageURL : 'logo.png'}
                />
              </div>
              <div className="post-body">
                <h3 className="focused-gig-title">
                  {getFullDate(focusedGig.dateTime)}{' '}
                  {getGigDate(focusedGig.dateTime).time}
                </h3>
                <h4 className="focused-gig-title">{focusedGig.location}</h4>

                {focusedGig.description
                  ? documentToReactComponents(focusedGig.description)
                  : null}
              </div>
              {focusedGig.ticketURL ? (
                <a
                  className="home-button"
                  href={focusedGig.ticketURL}
                  target="_blank"
                >
                  Book Tickets
                </a>
              ) : (
                <h4 className="focused-gig-title">This event is free!</h4>
              )}
            </article>
          ) : null}
        </Overlay>
      </aside>
    </>
  );
};

export default Gigs;
