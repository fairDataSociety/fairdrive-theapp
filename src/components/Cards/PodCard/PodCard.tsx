import ThemeContext from '@context/ThemeContext';
import { useContext } from 'react';
import DriveLightIcon from '@media/UI/drive-active-light.svg';
import DriveDarkIcon from '@media/UI/drive-active-dark.svg';
import shortenString from '@utils/shortenString';

interface PodCardProps {
  podName: string;
  onClick: (podName: string) => void;
}

export default function PodCard({ podName, onClick }: PodCardProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className="w-32 mb-2 py-2 py-8 flex-column cursor-pointer dark:hover:shadow-soft-purple hover:shadow-soft-purple"
      onClick={() => onClick(podName)}
    >
      <span className="flex text-color-accents-grey-lavendar dark:text-color-shade-dark-1-night">
        <div className="mx-auto">
          {theme === 'light' ? <DriveLightIcon /> : <DriveDarkIcon />}
        </div>
      </span>

      <h4 className="text-sm px-1 mt-2 overflow-x-hidden font-medium text-center text-color-shade-light-1-day dark:text-color-shade-light-1-night">
        {shortenString(podName, 24)}
      </h4>
    </div>
  );
}
