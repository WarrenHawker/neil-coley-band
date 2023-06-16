export type BandSection =
  | 'Trumpets'
  | 'Trombones'
  | 'Saxophones'
  | 'Rhythm and Vocals';

export interface ContentfulBandMember {
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
    section: BandSection;
    instrument: string | undefined;
  };
}

export interface BandMember {
  id: string;
  name: string;
  section: BandSection;
  instrument: string | undefined;
  photoURL: string;
  position: number;
}
