export type IBandSection =
  | 'Trumpets'
  | 'Trombones'
  | 'Saxophones'
  | 'Rhythm and Vocals';

export interface IContentfulBandMember {
  metadata: {};
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
