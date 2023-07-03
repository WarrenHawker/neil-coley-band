'use client';

import { useState, useEffect } from 'react';
import {
  IBandMember,
  IBandSection,
  IContentfulBandMember,
} from '../../lib/interfaces';
import BandMember from '@/components/bandMember';
import { contentfulClient } from '@/lib/functions';

const About = () => {
  const [members, setMembers] = useState<IBandMember[]>([]);
  const sections: IBandSection[] = [
    'Trumpets',
    'Trombones',
    'Saxophones',
    'Rhythm and Vocals',
  ];

  useEffect(() => {
    getEntries();
  }, []);

  const getEntries = async () => {
    const response = await contentfulClient.getEntries({
      content_type: 'bandMember',
    });
    const data: Array<IContentfulBandMember> = response.items as [];
    setMembers(
      data.map((item: IContentfulBandMember) => {
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
  };

  return (
    <>
      <h1>about page</h1>

      {sections.map((section, index) => (
        <section className="band-section" key={index}>
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
