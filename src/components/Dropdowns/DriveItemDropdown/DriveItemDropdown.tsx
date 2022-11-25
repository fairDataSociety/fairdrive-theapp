import { FC, useState } from 'react';

import { DriveItemDropdownToggle } from '@components/Buttons';

import DriveItemMenu from './DriveItemMenu';

interface DriveItemDropdownProps {
  type: 'folder' | 'file';
  data: {
    name: string;
  };
  openClick: () => void;
  updateDrive: () => void;
  handlePreviewClick?: () => void;
}

const DriveDropdown: FC<DriveItemDropdownProps> = ({
  type,
  data,
  openClick,
  updateDrive,
  handlePreviewClick,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div
      className="relative cursor-default"
      onClick={(event) => event.stopPropagation()}
    >
      <DriveItemDropdownToggle onClickHandler={handleToggleDropdown} />

      <DriveItemMenu
        data={data}
        type={type}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        openClick={openClick}
        updateDrive={updateDrive}
        handlePreviewClick={handlePreviewClick}
      />
    </div>
  );
};

export default DriveDropdown;
