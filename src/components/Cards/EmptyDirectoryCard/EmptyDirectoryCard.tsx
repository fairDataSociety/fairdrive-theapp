import InfoDarkIcon from '@media/UI/info-dark.svg';
import { useLocales } from '@context/LocalesContext';
import { Button } from '@components/Buttons';

export interface EmptyDirectoryCardProps {
  onUploadClick: () => void;
}

const EmptyDirectoryCard = ({ onUploadClick }: EmptyDirectoryCardProps) => {
  const { intl } = useLocales();

  return (
    <div className="flex justify-center items-center w-full pt-10">
      <div className="flex flex-col justify-center items-center w-auto px-10 sm:w-80 h-72 text-center dark:bg-color-shade-dark-4-night border border-color-shade-black-day dark:border-color-accents-purple-black shadow-soft-purple rounded-md">
        <span className="py-3 px-4 rounded shadow-soft-purple">
          <InfoDarkIcon className="inline-block" />
        </span>

        <div>
          <h2 className="mt-14 font-semibold text-2xl text-color-accents-purple-heavy text-center">
            {intl.get('NO_ITEMS')}
          </h2>

          <p className="mt-2 font-normal text-xs text-color-accents-plum-black dark:text-color-shade-light-2-night text-center">
            {intl.get('START_UPLOADING_OR_CREATING_FOLDERS')}
          </p>

          <Button
            className="mt-4"
            variant="tertiary-outlined"
            onClick={onUploadClick}
          >
            {intl.get('UPLOAD')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyDirectoryCard;
