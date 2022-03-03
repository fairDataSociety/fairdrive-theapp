import { FC } from 'react';

import WarningIcon from '@media/UI/warning.svg';

const DisclaimerMessage: FC = () => {
  return (
    <div className="flex justify-center items-center mb-10 py-4 px-8 text-xs text-center border border-color-accents-purple-heavy rounded">
      <span className="inine-block mr-4">
        <WarningIcon />
      </span>
      Fairdrive is in Beta and provided for evaluation only! File integrity
      persistence and security are not assured! Expect that data in Fairdrive
      can be deleted at any time.
    </div>
  );
};

export default DisclaimerMessage;
