import { useLocales } from '@context/LocalesContext';
import { FC } from 'react';

interface DriveToggleProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DriveToggle: FC<DriveToggleProps> = ({ activeTab, setActiveTab }) => {
  const { intl } = useLocales();

  const activeClass =
    'font-semibold text-color-accents-plum-black dark:text-color-accents-grey-cloud bg-color-shade-dark-4-day dark:bg-color-shade-dark-1-night effect-style-soft-purple-shadow';

  const inactiveClass =
    'font-normal text-color-accents-plum-black dark:text-color-accents-grey-cloud bg-color-shade-dark-4-day dark:bg-color-shade-dark-3-night effect-style-small-button-drop-shadow';

  return (
    <div className="flex justify-center items-center w-full text-center">
      <button
        className={`${
          activeTab === 'private' ? activeClass : inactiveClass
        } flex-grow py-2 px-3 rounded-l`}
        onClick={() => setActiveTab('private')}
      >
        {intl.get('PRIVATE')}
      </button>

      <button
        className={`${
          activeTab === 'shared' ? activeClass : inactiveClass
        } flex-grow py-2 px-3 rounded-r`}
        onClick={() => setActiveTab('shared')}
      >
        {intl.get('SHARED')}
      </button>
    </div>
  );
};

export default DriveToggle;
