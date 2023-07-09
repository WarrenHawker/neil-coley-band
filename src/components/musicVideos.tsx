'use client';
import { MusicVideo } from '@/lib/interfaces';
import YouTube from 'react-youtube';

interface MusicVideoProps {
  videos: MusicVideo[];
}

const MusicVideos = ({ videos }: MusicVideoProps) => {
  return (
    <>
      {videos.map((video: MusicVideo) => (
        <article key={video.id} className="music-video-container">
          <h3>{video.title}</h3>
          <YouTube videoId={video.videoURL.slice(17)} />
          {video.description ? <p>{video.description}</p> : null}
        </article>
      ))}
    </>
  );
};

export default MusicVideos;
