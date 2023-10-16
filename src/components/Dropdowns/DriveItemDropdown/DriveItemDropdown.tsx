import { FC } from 'react';

import { DriveItemDropdownToggle } from '@components/Buttons';

import DriveItemMenu from './DriveItemMenu';
import { UpdateDriveProps } from '@interfaces/handlers';

interface DriveItemDropdownProps extends UpdateDriveProps {
  type: 'folder' | 'file';
  data: {
    name: string;
  };
  mobileAlign?: 'left' | 'right';
  handlePreviewClick?: () => void;
}

const DriveDropdown: FC<DriveItemDropdownProps> = ({
  type,
  data,
  mobileAlign,
  updateDrive,
  handlePreviewClick,
}) => {
  return (
    <div
      className="relative cursor-default"
      onClick={(event) => event.stopPropagation()}
    >
      <DriveItemDropdownToggle />

      <DriveItemMenu
        data={data}
        type={type}
        mobileAlign={mobileAlign}
        updateDrive={updateDrive}
        handlePreviewClick={handlePreviewClick}
      />
    </div>
  );
};

export default DriveDropdown;
