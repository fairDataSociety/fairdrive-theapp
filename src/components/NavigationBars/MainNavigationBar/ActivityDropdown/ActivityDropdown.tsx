import { FC } from 'react';

interface ActivityDropdownProps {
  showDropdown: boolean;
  setShowDropdown: (showModal: boolean) => void;
}

const ActivityDropdown: FC<ActivityDropdownProps> = ({
  showDropdown,
  setShowDropdown,
}) => {
  return (
    <div
      className={`${showDropdown ? 'block' : 'hidden'} inset-0 fixed z-50`}
      onClick={() => setShowDropdown(false)}
    >
      <div className="relative w-full h-20 mx-auto">
        <div
          className="absolute top-14 right-28 w-72 py-4 px-4 bg-color-shade-dark-4-day dark:bg-color-shade-dark-3-night shadow-md rounded border border-color-shade-black-day dark:border-color-shade-light-3-day"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 text-color-accents-purple-heavy dark:text-color-accents-grey-lavendar">
            Your Connected Dapps
          </div>
          <p className="text-color-accents-plum-black dark:text-color-shade-white-night">
            Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityDropdown;
