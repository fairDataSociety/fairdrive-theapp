import React, { useState } from 'react';

import useStyles from './videoStatsStyles';
import { ReactComponent as Thumb } from '../../../../media/UI/thumb-up.svg';

import VideoComments from '../videoComments/videoComments';
import { Video } from '../../classes/video-resolver/types';

interface Props {
  video: Video;
}

const VideoStats = ({ video }: Props): JSX.Element => {
  const [showComments, setShowComments] = useState(false);
  const classes = useStyles();

  return (
    <>
      <div className={classes.videoStats}>
        <button
          className={classes.commentsToggle}
          onClick={() => setShowComments(true)}
        >
          {video.comments.length} comments
        </button>
        <span className={classes.videoVotes}>
          <Thumb className="" width={20} height={20} />
          <span className={classes.vote}>{video.totUpvotes}</span>
          <Thumb className={classes.thumbDown} width={20} height={20} />
          <span className={classes.vote}>{video.totDownvotes}</span>
        </span>
      </div>

      {showComments && (
        <VideoComments
          comments={video?.comments ?? []}
          onClose={() => setShowComments(false)}
        />
      )}
    </>
  );
};

export default VideoStats;
