import { FC } from 'react';

interface DriveToggleProps {
  activeTab: string;
  setActiveTab: any;
}

const DriveToggle: FC<DriveToggleProps> = ({ activeTab, setActiveTab }) => {
  const activeClass =
    'font-semibold text-color-accents-purple-black dark:text-color-accents-grey-lavendar bg-color-shade-dark-4-day dark:bg-color-shade-dark-1-night effect-style-dark-purple-shadow z-30';

  const inActiveClass =
    'text-color-accents-plum-black dark:text-color-accents-grey-cloud bg-color-shade-dark-4-day dark:bg-color-shade-dark-3-night effect-style-small-button-drop-shadow z-10';

  return (
    <div className="text-center">
      <button
        className={`${
          activeTab === 'private' ? activeClass : inActiveClass
        } py-2 px-3 rounded-l`}
        onClick={() => setActiveTab('private')}
      >
        Private
      </button>

      <button
        className={`${
          activeTab === 'shared' ? activeClass : inActiveClass
        } py-2 px-3 rounded-r`}
        onClick={() => setActiveTab('shared')}
      >
        Shared
      </button>
    </div>
  );
};

export default DriveToggle;
