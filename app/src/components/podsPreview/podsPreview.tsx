import React, { useContext } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import useStyles from './podsPreviewStyles';
import PodActivity from './podActivity';
export interface Props {}
function PodsPreview(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const onHandleClick = () => console.log('onHandleClick');

  return (
    <div className={classes.pods}>
      <PodActivity
        heading="Private Pod"
        info="Private pod is a default pod that has all your uploaded content off all owned content"
        handleClick={() => onHandleClick()}
      />
      <PodActivity
        heading="Shared Pod"
        info="Shared pod is a default pod that has all content that is shared with you. Any content you recieve and accept is in this pod"
        handleClick={() => onHandleClick()}
      />
    </div>
  );
}

export default React.memo(PodsPreview);
