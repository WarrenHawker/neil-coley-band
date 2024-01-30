interface BandMemberProps {
  key: string;
  name: string;
  photoURL: string;
  instrument: string | undefined;
}

const BandMember = ({ name, photoURL, instrument }: BandMemberProps) => {
  return (
    <div className="band-member">
      <div className="band-member-pic">
        <img src={photoURL} alt={`${name} photo`} />
      </div>
      <div className="band-member-info">
        <h2>{name}</h2>
        {instrument ? <p>{instrument}</p> : null}
      </div>
    </div>
  );
};

export default BandMember;
