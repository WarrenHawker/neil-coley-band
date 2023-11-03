import { Document } from '@contentful/rich-text-types';

export type IBandSection =
  | 'Trumpets'
  | 'Trombones'
  | 'Saxophones'
  | 'Rhythm and Vocals';

export interface IContentfulBandMember {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    photo: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    position: number;
    section: IBandSection;
    instrument: string | undefined;
  };
}

export interface IContentfulCarousel {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    photo: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
}

export interface IContentfulNewsPost {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    isGig: boolean;
    location?: string;
    dateTime?: string;
    ticketUrl?: string;
    slug: string;
    title: string;
    body: Document;
    thumbnail:
      | {
          fields: {
            file: {
              url: string;
            };
          };
        }
      | undefined;
  };
}

export interface INewsPost {
  id: string;
  createdDate: string;
  title: string;
  body: Document;
  thumbnail: string | undefined;
  slug: string;
  focused: boolean;
}

export interface IContentfulHomeText {
  fields: {
    section1: Document;
    homepageImage: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    section2: Document;
  };
}

export interface IContentfulPageText {
  fields: {
    text: Document;
  };
}

export interface IContentfulMusic {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    videoUrl: string;
    description: string | undefined;
  };
}

export interface MusicVideo {
  id: string;
  title: string;
  videoURL: string;
  description: string | undefined;
}

export interface IGig {
  id: string;
  title: string;
  description: Document | undefined;
  location?: string;
  dateTime?: string;
  imageURL?: string;
  ticketURL?: string;
}
