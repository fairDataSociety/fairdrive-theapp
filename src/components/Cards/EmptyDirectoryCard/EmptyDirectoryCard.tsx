import { FC } from 'react';

import InfoDarkIcon from '@media/UI/info-dark.svg';

const EmptyDirectoryCard: FC = () => {
  return (
    <div className="flex justify-center items-center w-full pt-10">
      <div className="flex flex-col justify-center items-center w-auto px-10 sm:w-80 h-72 text-center dark:bg-color-shade-dark-4-night border border-color-shade-black-day dark:border-color-accents-purple-black shadow-soft-purple rounded-md">
        <span className="py-3 px-4 rounded shadow-soft-purple">
          <InfoDarkIcon className="inline-block" />
        </span>

        <div>
          <h2 className="mt-14 font-semibold text-2xl text-color-accents-purple-heavy text-center">
            No Items
          </h2>

          <p className="mt-2 font-normal text-xs text-color-accents-plum-black dark:text-color-shade-light-2-night text-center">
            Start Uploading or Creating Folders
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyDirectoryCard;
