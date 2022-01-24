import { FC, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';

import ArrowRightLight from '@media/UI/arrow-right-light.svg';
import ArrowRightDark from '@media/UI/arrow-right-dark.svg';
import ArrowRightActive from '@media/UI/arrow-right-active.svg';

interface PodItemProps {
  podName: string;
  isActivePod: boolean;
  onClick: () => void;
}

const PodItem: FC<PodItemProps> = ({ podName, isActivePod, onClick }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      onClick={onClick}
      className={`${
        isActivePod
          ? 'border-r-2 border-color-accents-purple-heavy effect-style-small-button-drop-shadow'
          : ''
      } flex justify-between items-center w-full py-5 px-4 cursor-pointer`}
    >
      <span
        className={`${
          isActivePod
            ? 'text-color-accents-purple-heavy dark:text-color-accents-grey-lavendar'
            : 'text-color-accents-plum-black  dark:text-color-shade-light-2-night'
        }`}
      >
        {podName}
      </span>

      <span>
        {isActivePod ? (
          <ArrowRightActive className="inline-block ml-2" />
        ) : theme === 'light' ? (
          <ArrowRightLight className="inline-block ml-2" />
        ) : (
          <ArrowRightDark className="inline-block ml-2" />
        )}
      </span>
    </div>
  );
};

export default PodItem;
