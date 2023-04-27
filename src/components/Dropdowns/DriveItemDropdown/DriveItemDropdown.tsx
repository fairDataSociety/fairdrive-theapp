import { FC, useState } from 'react';

import { DriveItemDropdownToggle } from '@components/Buttons';

import DriveItemMenu from './DriveItemMenu';
import { UpdateDriveProps } from '@interfaces/handlers';

interface DriveItemDropdownProps extends UpdateDriveProps {
  type: 'folder' | 'file';
  data: {
    name: string;
  };
  showDropdown: boolean;
  onShowDropdownChange: (showDropdown: boolean) => void;
  openClick: () => void;
  handlePreviewClick?: () => void;
}

const DriveDropdown: FC<DriveItemDropdownProps> = ({
  type,
  data,
  showDropdown,
  onShowDropdownChange,
  openClick,
  updateDrive,
  handlePreviewClick,
}) => {
  return (
    <div
      className="relative cursor-default"
      onClick={(event) => event.stopPropagation()}
    >
      <DriveItemDropdownToggle
        onClickHandler={() => onShowDropdownChange(!showDropdown)}
      />

      <DriveItemMenu
        data={data}
        type={type}
        showDropdown={showDropdown}
        setShowDropdown={onShowDropdownChange}
        openClick={openClick}
        updateDrive={updateDrive}
        handlePreviewClick={handlePreviewClick}
      />
    </div>
  );
};

export default DriveDropdown;
