import { Button } from '@components/Buttons';
import DirectoryPath from '@components/DirectoryPath/DirectoryPath';
import PodDropdown from '@components/Dropdowns/PodDropdown/PodDropdown';
import ThemeContext from '@context/ThemeContext';
import { useContext } from 'react';

import DriveViewListLight from '@media/UI/drive-view-list-light.svg';
import DriveViewListDark from '@media/UI/drive-view-list-dark.svg';
import DriveViewGridLight from '@media/UI/drive-view-grid-light.svg';
import DriveViewGridDark from '@media/UI/drive-view-grid-dark.svg';

import SortLight from '@media/UI/sort-light.svg';
import SortDark from '@media/UI/sort-dark.svg';

interface DriveActionHeaderMobileProps {
  podName: string;
  subscribedPod: boolean;
  driveView: 'grid' | 'list';
  directory: string;
  onDirectorySelect: (newDirectory: string) => void;
  onBackToDrive: () => void;
  toggleView: () => void;
  toggleSort: () => void;
}

const DriveActionHeaderMobile = ({
  podName,
  subscribedPod,
  driveView,
  directory,
  onDirectorySelect,
  onBackToDrive,
  toggleView,
  toggleSort,
}: DriveActionHeaderMobileProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex w-full mb-2">
      <PodDropdown />
      <DirectoryPath
        podName={podName}
        subscribedPod={subscribedPod}
        directory={directory}
        onDirectorySelect={onDirectorySelect}
        onBackToDrive={onBackToDrive}
      />
      {podName && (
        <div className="ml-auto flex md:hidden">
          <Button
            type="button"
            variant="primary"
            icon={
              driveView === 'grid' ? (
                theme === 'light' ? (
                  <DriveViewListLight />
                ) : (
                  <DriveViewListDark />
                )
              ) : theme === 'light' ? (
                <DriveViewGridLight />
              ) : (
                <DriveViewGridDark />
              )
            }
            className="mx-1"
            padding="p-3"
            onClick={toggleView}
          />

          <Button
            type="button"
            variant="primary"
            icon={theme === 'light' ? <SortLight /> : <SortDark />}
            className="mx-1"
            padding="p-3"
            onClick={toggleSort}
          />
        </div>
      )}
    </div>
  );
};

export default DriveActionHeaderMobile;
