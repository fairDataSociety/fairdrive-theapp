import { FC } from 'react';

import WarningIcon from '@media/UI/warning.svg';
import InfoIcon from '@media/UI/info-dark.svg';

export enum IconType {
  WARNING = 'warning',
  INFO = 'info',
}

interface DisclaimerProps {
  text: string;
  icon: IconType;
  url?: string;
}

const DisclaimerMessage: FC<DisclaimerProps> = ({ text, icon, url }) => {
  return (
    <div className="flex justify-center items-center mb-10 py-4 px-8 text-xs text-center border border-color-accents-purple-heavy rounded text-color-accents-plum-black dark:text-color-accents-grey-pastel">
      <span className="inline-block mr-4">
        {icon === IconType.WARNING && <WarningIcon />}
        {icon === IconType.INFO && <InfoIcon />}
      </span>
      {url ? (
        <a className="underline" href={url} target="_blank" rel="noreferrer">
          {text}
        </a>
      ) : (
        text
      )}
    </div>
  );
};

export default DisclaimerMessage;
