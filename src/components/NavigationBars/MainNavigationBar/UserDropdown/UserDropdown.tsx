import { FC } from 'react';

interface UserDropdownProps {
  showDropdown: boolean;
  setShowDropdown: (showModal: boolean) => void;
}

const UserDropdown: FC<UserDropdownProps> = ({
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
          className="absolute top-14 right-16 w-72 py-4 px-4 bg-color-shade-dark-4-day dark:bg-color-shade-dark-3-night shadow-md rounded border border-color-shade-black-day dark:border-color-shade-light-3-day"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pb-5 mr-5 mb-5 border-b-2 border-color-shade-light-1-day dark:border-color-shade-light-1-night dark:text-color-shade-white-night">
            User Name
          </div>

          <div className="">
            <div className="mb-4 cursor-pointer dark:text-color-shade-white-night">
              Export User
            </div>
            <div className="mb-4 text-color-status-negative-day cursor-pointer">
              Log out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
