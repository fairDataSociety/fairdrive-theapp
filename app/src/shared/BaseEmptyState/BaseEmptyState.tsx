import React, { useContext, useEffect, useState } from 'react';

// Contexts
import { useTheme } from 'src/contexts/themeContext/themeContext';

// Hooks
import useStyles from './BaseEmptyStateStyles';

// Helpers
import { isValueInEnum } from 'src/helpers/isValueInEnum';

// Components
import BaseActionButton, {
  ACTION_BUTTON_VARIANTS,
  ACTION_BUTTON_ICONS,
} from 'src/shared/BaseActionButton/BaseActionButton';

export enum EMPTY_STATE_VARIANTS {
  THRASH_PAGE = 'thrash_page',
  EMPTY_STATE = 'empty_state',
}

export interface Props {
  variant: EMPTY_STATE_VARIANTS;
}

function BaseEmptyState(props: Props): JSX.Element {
  const { variant = EMPTY_STATE_VARIANTS.EMPTY_STATE } = props;
  const { theme } = useTheme();

  const classes = useStyles({ ...theme });

  const [information, setInformation] = useState({
    icon: ACTION_BUTTON_ICONS.TRASH,

    title: 'Trash Empty',
    caption: 'Files are Removed after 30 days',
  });

  useEffect(() => {
    isValueInEnum(variant, EMPTY_STATE_VARIANTS);
    if (variant === EMPTY_STATE_VARIANTS.EMPTY_STATE) {
      setInformation({
        icon: ACTION_BUTTON_ICONS.INFO_ICON,

        title: 'No Items',
        caption: 'Start Uploading  or Creating Files ',
      });
    }
    if (variant === EMPTY_STATE_VARIANTS.THRASH_PAGE) {
      setInformation({
        icon: ACTION_BUTTON_ICONS.TRASH,

        title: 'Trash Empty',
        caption: 'Files are Removed after 30 days',
      });
    }
  }, [variant]);

  return (
    <div className={classes.card}>
      <BaseActionButton
        icon={information.icon}
        variant={ACTION_BUTTON_VARIANTS.ACTION_OUTLINED_WITHOUT_TEXT}
      />
      <p className={classes.title}>{information.title}</p>
      <p className={classes.subtitle}>{information.caption}</p>
    </div>
  );
}

export default React.memo(BaseEmptyState);
