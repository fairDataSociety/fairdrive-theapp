import React, { useEffect, useState } from 'react';

import useStyles from './filePreviewVideoStyles';
import { ReactComponent as Spinner } from '../../../../media/UI/spinner.svg';
import { ReactComponent as Play } from '../../../../media/UI/play.svg';
import { ReactComponent as Logo } from './logo.svg';

import SwarmImg from '../swarmImg';
import VideoStats from '../videoStats/videoStats';
import SwarmImageReader from '../../classes/swarm-image/swarm-image-reader';
import VideoResolver from '../../classes/video-resolver/video-resolver';
import { Video } from '../../classes/video-resolver/types';
import { filePreview } from '../../../../store/services/fairOS';

interface Props {
  filename: string;
  directory: string;
  podName: string;
}

const FilePreviewVideo = ({
  filename,
  directory,
  podName,
}: Props): JSX.Element => {
  const [title, setTitle] = useState<string>();
  const [externalLink, setExternalLink] = useState<string>();
  const [image, setImage] = useState<SwarmImageReader | undefined>();
  const [video, setVideo] = useState<Video | undefined>();
  const [videoSrc, setVideoSrc] = useState<string>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    loadVideo();

    return () => {
      URL.revokeObjectURL(videoSrc);
    };
  }, []);

  const loadVideo = async () => {
    setIsLoading(true);

    const indexApiPath = process.env.REACT_APP_ETHERNA_INDEX_API_PATH;
    const beeHost = process.env.REACT_APP_BEE_HOST;
    const videoResolver = new VideoResolver(indexApiPath, beeHost);
    const video = await videoResolver.resolveVideoWithPath(
      `${directory}/${filename}`
    );

    if (video && video.meta) {
      setTitle(video.meta.title);
      setImage(new SwarmImageReader(video.meta.thumbnail));
    }

    if (video) {
      setVideo(video);
      setExternalLink(
        `${process.env.REACT_APP_ETHERNA_HOST}/watch?v=${video.manifestHash}`
      );
    }

    const preview = await filePreview(filename, directory, podName);
    setVideoSrc(window.URL.createObjectURL(preview));

    setIsLoading(false);
  };

  return (
    <div className={classes.videoPreview}>
      <div className={classes.thumbnail}>
        {isLoading && (
          <Spinner className={classes.spinner} width={20} height={20} />
        )}

        {!isLoading && (
          <>
            {isPlaying ? (
              <video
                className={classes.video}
                src={videoSrc}
                autoPlay
                controls
              />
            ) : (
              <>
                <SwarmImg
                  image={image}
                  fallback="data:image/gif;base64,R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                />
                <button
                  className={classes.play}
                  onClick={() => setIsPlaying(true)}
                >
                  <Play width={80} height={80} />
                </button>
              </>
            )}
          </>
        )}
      </div>

      {video && <VideoStats video={video} />}

      {title && <div className={classes.title}>{title}</div>}

      {externalLink && (
        <a
          className={classes.ethernaBtn}
          href={externalLink}
          target="_blank"
          rel="noreferrer"
        >
          <Logo height={24} />
          <span>Watch on Etherna</span>
        </a>
      )}
    </div>
  );
};

export default FilePreviewVideo;
