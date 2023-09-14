import DirectoryPath from '@components/DirectoryPath/DirectoryPath';
import PodDropdown from '@components/Dropdowns/PodDropdown/PodDropdown';

interface DriveActionHeaderMobileProps {
  podName: string;
  directory: string;
  onDirectorySelect: (newDirectory: string) => void;
  onBackToDrive: () => void;
}

const DriveActionHeaderMobile = ({
  podName,
  directory,
  onDirectorySelect,
  onBackToDrive,
}: DriveActionHeaderMobileProps) => {
  return (
    <>
      <PodDropdown />
      <DirectoryPath
        className="flex sm:hidden"
        podName={podName}
        directory={directory}
        onDirectorySelect={onDirectorySelect}
        onBackToDrive={onBackToDrive}
      />
    </>
  );
};

export default DriveActionHeaderMobile;
