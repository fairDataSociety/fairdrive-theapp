import { FC, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';

import ActivityLightIcon from '@media/UI/activity-light.svg';
import ActivityDarkIcon from '@media/UI/activity-dark.svg';

interface ActivityDropdownToggleProps {
  onClickHandler: any;
}

const ActivityDropdownToggle: FC<ActivityDropdownToggleProps> = ({
  onClickHandler,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button className="cursor-pointer" onClick={() => onClickHandler()}>
      {theme === 'light' ? (
        <ActivityLightIcon className="inline-block mr-2" />
      ) : (
        <ActivityDarkIcon className="inline-block mr-2" />
      )}
      <span className="text-color-accents-purple-heavy dark:text-color-accents-grey-lavendar">
        Activity
      </span>
    </button>
  );
};

export default ActivityDropdownToggle;
