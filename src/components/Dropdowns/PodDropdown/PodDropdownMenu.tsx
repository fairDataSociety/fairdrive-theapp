import { FC, useContext } from 'react';

import PodContext from '@context/PodContext';
import sortAlphabetically from '@utils/sortAlphabetically';

export interface PodDropdownMenuProps {
  showDropdown: boolean;
  onClose: () => void;
}

const PodItem = ({
  podName,
  onPodSelect,
}: {
  podName: string;
  onPodSelect: (podName: string) => void;
}) => {
  return (
    <span
      className="block w-auto py-2 font-normal text-color-shade-white-day dark:text-color-shade-white-night text-base cursor-pointer"
      onClick={() => onPodSelect(podName)}
    >
      {podName}
    </span>
  );
};

const PodDropdownMenu: FC<PodDropdownMenuProps> = ({
  showDropdown,
  onClose,
}) => {
  const { activePod, pods, setActivePod, setDirectoryName } =
    useContext(PodContext);

  const onPodSelect = (podName: string) => {
    setActivePod(podName);
    setDirectoryName('root');
    onClose();
  };

  if (!showDropdown) {
    return null;
  }

  return (
    <>
      <div className="absolute top-12 w-48 p-5 bg-color-shade-dark-1-day dark:bg-color-shade-dark-3-night text-left rounded-md shadow z-30">
        <h4 className="mb-3 pb-3 font-semibold text-color-shade-white-day dark:text-color-shade-white-night text-base border-b-2 border-color-shade-light-1-day dark:border-color-shade-light-1-night">
          {activePod || 'Select a pod'}
        </h4>

        {sortAlphabetically(pods?.pod_name).map((podName) => (
          <PodItem key={podName} podName={podName} onPodSelect={onPodSelect} />
        ))}

        <span className="border-b-2 border-color-shade-light-1-day dark:border-color-shade-light-1-night"></span>

        {sortAlphabetically(pods?.shared_pod_name).map((podName) => (
          <PodItem key={podName} podName={podName} onPodSelect={onPodSelect} />
        ))}
      </div>
    </>
  );
};

export default PodDropdownMenu;
