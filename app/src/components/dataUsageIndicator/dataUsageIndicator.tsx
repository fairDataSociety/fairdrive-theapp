import React from 'react';

// Contexts
import { useTheme } from 'src/contexts/themeContext/themeContext';
import { useModal, MODAL_VARIANTS } from 'src/contexts/modalContext';

// Hooks
import useStyles from './dataUsageIndicatorStyles';

// Components
import CircularProgress from '../circularProgress/circularProgress';
import { QuestionCircle } from '../icons/icons';

export interface Props {
  heading?: string;
  usedSpace?: string;
  spaceLeft?: string;
  handleClick?: () => void;
}

function DataUsageIndicator() {
  const { openModal } = useModal();

  const { theme } = useTheme();
  const classes = useStyles({ ...theme });
  const percentage = 80;

  const handleReferFriend = () => {
    openModal({
      type: MODAL_VARIANTS.GENERATE_LINK,
      data: {
        type: 'Referal',
        // TODO: After implement of refering friends connect below to proper machine event
        link: 'RANDOM_REFERAL_LINK',
      },
    });
  };

  return (
    // <div className={classes.container}>
    // <div className={classes.heading}>Your Storage</div>
    // <div className={classes.wrapper}>
    //   <CircularProgress percentage={percentage} />
    //   <div className={classes.description}>
    //     <div className={classes.header}>{props.heading}</div>
    //     <div className={classes.layout}>
    //       <span className={classes.bold}>{props.usedSpace}</span>
    //       of
    //       <span className={classes.bold}>{props.spaceLeft}</span>
    //       remaining
    //     </div>
    //   </div>
    //  </div>
    // <div className={classes.refermessage}>
    //    <QuestionCircle className={classes.icon} />
    //    <p>Refer A friend to gain more storage. Read up on how to do this on our community channels</p>
    //  </div>
    //   <button className={classes.button} onClick={() => setShowRefer(true)}>
    //      Refer a friend
    //    </button>
    //    {showRefer && (
    //    <ClickAwayListener onClickAway={() => setShowRefer(false)}>
    //      <GenerateLink variant="refer" />
    //    </ClickAwayListener>
    //    )}
    // </div>

    // Uncomment to view populated component
    // This is demo version
    <div className={classes.container}>
      <div className={classes.heading}>Your Storage</div>
      <div className={classes.wrapper}>
        <CircularProgress percentage={percentage} />
        <div className={classes.description}>
          <div className={classes.header}>Storage</div>
          <div className={classes.layout}>
            <span className={classes.bold}>2.4GB</span>
            of
            <span className={classes.bold}>150GB</span>
            remaining
          </div>
        </div>
      </div>
      <div className={classes.refermessage}>
        <QuestionCircle className={classes.icon} />
        <p>
          Refer A friend to gain more storage. Read up on how to do this on our
          community channels
        </p>
      </div>
      <button className={classes.button} onClick={() => handleReferFriend()}>
        Refer a friend
      </button>
    </div>
  );
}

export default React.memo(DataUsageIndicator);
