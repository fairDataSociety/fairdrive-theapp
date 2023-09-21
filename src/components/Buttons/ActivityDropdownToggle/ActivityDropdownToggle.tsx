import { FC, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';

import ActivityLightIcon from '@media/UI/activity-light.svg';
import ActivityDarkIcon from '@media/UI/activity-dark.svg';
import { useLocales } from '@context/LocalesContext';

interface ActivityDropdownToggleProps {
  onClickHandler: any;
}

const ActivityDropdownToggle: FC<ActivityDropdownToggleProps> = ({
  onClickHandler,
}) => {
  const { theme } = useContext(ThemeContext);
  const { intl } = useLocales();

  return (
    <button className="cursor-pointer" onClick={() => onClickHandler()}>
      {theme === 'light' ? (
        <ActivityLightIcon className="inline-block mr-2" />
      ) : (
        <ActivityDarkIcon className="inline-block mr-2" />
      )}
      <span className="text-color-accents-purple-heavy dark:text-color-accents-grey-lavendar">
        {intl.get('ACTIVITY')}
      </span>
    </button>
  );
};

export default ActivityDropdownToggle;
