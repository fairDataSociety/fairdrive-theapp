import { FC, useContext, useState } from 'react';
import router from 'next/router';

import { ExportUserModal } from '@components/Modals';

import UserContext from '@context/UserContext';
import CustomNetworkModal from '@components/Modals/CustomNetworkModal/CustomNetworkModal';

interface UserDropdownProps {
  showDropdown: boolean;
  setShowDropdown: (showModal: boolean) => void;
}

const UserDropdown: FC<UserDropdownProps> = ({
  showDropdown,
  setShowDropdown,
}) => {
  const { user } = useContext(UserContext);
  const [showCustomNetworkModal, setCustomNetworkModal] = useState(false);
  const [showExportUserModal, setShowExportUserModal] = useState(false);

  const disconnect = async () => {
    router.push('/');
  };

  return (
    <div
      className="relative cursor-default"
      onClick={(event) => event.stopPropagation()}
    >
      <div
        className={`${showDropdown ? 'block' : 'hidden'} inset-0 fixed z-50`}
        onClick={() => setShowDropdown(false)}
      >
        <div className="relative w-full h-20 mx-auto">
          <div
            className="absolute top-14 right-16 w-72 py-4 px-4 bg-color-shade-dark-4-day dark:bg-color-shade-dark-3-night shadow-md rounded border border-color-shade-black-day dark:border-color-shade-light-3-day"
            onClick={(e) => e.stopPropagation()}
          >
            <div>{user}</div>
            <div>
              <div
                className="pb-5 mr-5 mb-5 border-b-2 border-color-shade-light-1-day dark:border-color-shade-light-1-night dark:text-color-shade-white-night"
                onClick={() => setCustomNetworkModal(true)}
              >
                Add custom bee network
              </div>
            </div>

            <div>
              <div
                className="mb-4 text-color-status-negative-day cursor-pointer"
                onClick={disconnect}
              >
                Log out
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <ExportUserModal
        showModal={showExportUserModal}
        closeModal={() => setShowExportUserModal(false)}
      /> */}
      {showCustomNetworkModal ? (
        <CustomNetworkModal
          showModal={showCustomNetworkModal}
          closeModal={() => setCustomNetworkModal(false)}
        />
      ) : null}
    </div>
  );
};

export default UserDropdown;
