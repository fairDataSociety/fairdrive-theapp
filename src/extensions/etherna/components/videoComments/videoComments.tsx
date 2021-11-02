import React from 'react';
import moment from 'moment';

import useStyles from './videoCommentsStyles';

import { IndexVideoComment } from '../../classes/video-resolver/types';

interface Props {
  comments: IndexVideoComment[];
  onClose(): void;
}

const VideoComments = ({ comments, onClose }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ul className={classes.commentsList}>
        {comments.map((comment, i) => (
          <li className={classes.comment} key={i}>
            <span className={classes.commentTime}>
              {moment
                .duration(moment(comment.creationDateTime).diff(moment()))
                .humanize(true)}
            </span>
            <span className="">{comment.text}</span>
          </li>
        ))}
      </ul>

      <button className={classes.close} onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default VideoComments;
