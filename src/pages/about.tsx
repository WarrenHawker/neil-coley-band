import { createClient } from 'contentful';
import { useState, useEffect } from 'react';
import {
  BandMember,
  BandSection,
  ContentfulBandMember,
} from '../misc/interfaces';

export const getStaticProps = async () => {
  //checks to see if environment variables are loaded
  if (!process.env.SPACE_ID) {
    throw new Error('contentful SPACE_ID is missing');
  }
  if (!process.env.ACCESS_TOKEN) {
    throw new Error('contentful ACCESS_TOKEN is missing');
  }

  //create new instance of contentful client using api key data (see .env.local file)
  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  });

  //get band members from contentful
  const response = await client.getEntries({ content_type: 'bandMember' });

  return {
    props: {
      bandMembers: response.items,
    },
  };
};

interface AboutPageProps {
  bandMembers: ContentfulBandMember[];
}

const About = ({ bandMembers }: AboutPageProps) => {
  const [members, setMembers] = useState<BandMember[]>([]);
  const sections: BandSection[] = [
    'Trumpets',
    'Trombones',
    'Saxophones',
    'Rhythm and Vocals',
  ];

  useEffect(() => {
    const newMembers: BandMember[] = bandMembers.map((item) => {
      return {
        id: item.sys.id,
        name: item.fields.name,
        section: item.fields.section,
        instrument: item.fields.instrument,
        photoURL: item.fields.photo.fields.file.url,
        position: item.fields.position,
      };
    });
    setMembers(newMembers);
  }, [bandMembers]);

  console.log(bandMembers);
  console.log(members);
  return (
    <>
      <h1>about page</h1>
      {members.map((member) => (
        <img key={member.id} src={member.photoURL} />
      ))}
    </>
  );
};

export default About;
