import { createClient } from 'contentful';
import { useState, useEffect } from 'react';
import {
  IBandMember,
  IBandSection,
  IContentfulBandMember,
} from '../misc/interfaces';
import BandMember from '@/components/bandMember';

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
  bandMembers: IContentfulBandMember[];
}

const About = ({ bandMembers }: AboutPageProps) => {
  const [members, setMembers] = useState<IBandMember[]>([]);
  const sections: IBandSection[] = [
    'Trumpets',
    'Trombones',
    'Saxophones',
    'Rhythm and Vocals',
  ];

  useEffect(() => {
    setMembers(
      bandMembers.map((item) => {
        return {
          id: item.sys.id,
          name: item.fields.name,
          section: item.fields.section,
          instrument: item.fields.instrument,
          photoURL: item.fields.photo.fields.file.url,
          position: item.fields.position,
        };
      })
    );
  }, [bandMembers]);

  console.log(bandMembers);
  console.log(members);
  return (
    <>
      <h1>about page</h1>

      {sections.map((section) => (
        <section className="band-section">
          <h1 className="section-header">{section}</h1>
          <div className="band-section-inner">
            {members
              .filter((item) => item.section == section)
              .sort((a, b) => a.position - b.position)
              .map((member) => (
                <BandMember
                  key={member.id}
                  name={member.name}
                  instrument={member.instrument}
                  photoURL={member.photoURL}
                />
              ))}
          </div>
        </section>
      ))}
    </>
  );
};

export default About;
