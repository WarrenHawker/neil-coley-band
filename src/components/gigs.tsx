'use client';

import { IGig } from '@/lib/interfaces';
import SingleGig from './singleGig';
import { useState } from 'react';
import Overlay from './Overlay';

interface GigsProps {
  gigPosts: IGig[];
}

const Gigs = ({ gigPosts }: GigsProps) => {
  const [gigs, setPosts] = useState(gigPosts);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [focusedGig, setFocusedGig] = useState<IGig | null>(null);

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
      <section className="gigs">
        <h2>Upcoming Gigs</h2>
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
            <div className="post-body"></div>
          </article>
        ) : null}
      </Overlay>
    </>
  );
};

export default Gigs;
