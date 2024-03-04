import { useContext, useMemo } from 'react';
import PageDownLight from '@media/UI/page-down-light.svg';
import PageDownDark from '@media/UI/page-down-dark.svg';
import { Button } from '@components/Buttons';
import ThemeContext from '@context/ThemeContext';
import { useLocales } from '@context/LocalesContext';

interface DirectoryPathProps {
  podName: string;
  subscribedPod: boolean;
  directory: string;
  onDirectorySelect: (newDirectory: string) => void;
  onBackToDrive: () => void;
  className?: string;
}

const MAX_FOLDERS = 3;
const folderClasses =
  'text-color-accents-purple-heavy dark:text-color-accents-grey-lavendar';
const selectableClasses = 'cursor-pointer hover:bg-color-shade-dark-3-day';

const DirectoryPath = ({
  podName,
  subscribedPod,
  directory,
  onDirectorySelect,
  onBackToDrive,
  className,
}: DirectoryPathProps) => {
  const { theme } = useContext(ThemeContext);
  const [folders, displayedFolders] = useMemo(() => {
    const folders = (directory === 'root' ? '' : directory).split('/');
    return [folders, folders.slice(-MAX_FOLDERS)];
  }, [directory]);
  const { intl } = useLocales();

  const offset = folders.length - displayedFolders.length;

  const onFolderClick = (index: number) => {
    onDirectorySelect(folders.filter((folder, i) => i <= index).join('/'));
  };

  return (
    <div className={`flex items-center overflow-hidden ${className}`}>
      {podName && (
        <Button
          variant="tertiary"
          onClick={onBackToDrive}
          icon={
            theme === 'light' ? (
              <PageDownLight className="inline ml-2" />
            ) : (
              <PageDownDark className="inline ml-2" />
            )
          }
          className="m-auto hidden md:block"
        />
      )}

      <span
        className={`relative hidden md:inline ${folderClasses} ${selectableClasses}`}
        onClick={() => onDirectorySelect('root')}
      >
        {podName}
        {subscribedPod && (
          <div className="text-xs">({intl.get('SUBSCRIBED')})</div>
        )}
      </span>
      {offset > 0 && <span className={folderClasses}>&nbsp;/ ...</span>}
      {displayedFolders.map((folder, index) => (
        <span className={folderClasses} key={index}>
          &nbsp;/&nbsp;
          <a
            className={selectableClasses}
            onClick={() => onFolderClick(offset + index)}
          >
            {folder}
          </a>
        </span>
      ))}
    </div>
  );
};

export default DirectoryPath;
