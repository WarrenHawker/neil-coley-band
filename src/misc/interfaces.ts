import { Document } from '@contentful/rich-text-types';
import { ReactNode } from 'react';

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

export interface ICarousel {
  id: string;
  name: string;
  photoURL: string;
  position: number;
}

export interface IBandMember {
  id: string;
  name: string;
  section: IBandSection;
  instrument: string | undefined;
  photoURL: string;
  position: number;
}

export interface IContentfulNewsPost {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
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

export interface RichText {
  children: ReactNode;
}
