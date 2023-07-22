'use client';

import { getGigDate } from '@/lib/functions';
import { IGig } from '@/lib/interfaces';

interface SingleGigProps {
  gig: IGig;
  focusGig: (id: string) => void;
}

const SingleGig = ({ gig, focusGig }: SingleGigProps) => {
  const gigDate = getGigDate(gig.dateTime);
  return (
    <article className="gig" onClick={() => focusGig(gig.id)}>
      <div className="gig-date">
        <p>{gigDate.weekday}</p>
        <p>{gigDate.day}</p>
        <p>{gigDate.month}</p>
        <p>{gigDate.time}</p>
      </div>
      <div className="gig-title">
        <h3>{gig.title}</h3>
        <button>Learn More</button>
      </div>
    </article>
  );
};

export default SingleGig;
