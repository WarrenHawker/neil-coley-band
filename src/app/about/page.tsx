import {
  IBandSection,
  IContentfulPageText,
  IContentfulBandMember,
} from '../../lib/interfaces';
import BandMember from '@/components/bandMember';
import { contentfulClient } from '@/lib/functions';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const fetchBandMembers = async () => {
  const res = await contentfulClient.getEntries({
    content_type: 'bandMember',
  });
  const data: Array<IContentfulBandMember> = res.items as [];

  const bandMembers = data.map((item: IContentfulBandMember) => {
    return {
      id: item.sys.id,
      name: item.fields.name,
      section: item.fields.section,
      instrument: item.fields.instrument,
      photoURL: item.fields.photo.fields.file.url,
      position: item.fields.position,
    };
  });
  return bandMembers;
};

const fetchText = async () => {
  const res = await contentfulClient.getEntries({
    content_type: 'aboutPageText',
  });
  const data: Array<IContentfulPageText> = res.items as [];

  const text = data.map((item: IContentfulPageText) => {
    return {
      text: item.fields.text,
    };
  })[0];
  return text;
};

const About = async () => {
  const membersData = fetchBandMembers();
  const textData = fetchText();

  const [members, text] = await Promise.all([membersData, textData]);
  const sections: IBandSection[] = [
    'Trumpets',
    'Trombones',
    'Saxophones',
    'Rhythm and Vocals',
  ];

  return (
    <>
      <h1 className="page-title">about us</h1>
      <section className="page-text">
        {documentToReactComponents(text.text)}
      </section>
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
