import { useContext, useMemo } from 'react';
import PageDownLight from '@media/UI/page-down-light.svg';
import PageDownDark from '@media/UI/page-down-dark.svg';
import { Button } from '@components/Buttons';
import ThemeContext from '@context/ThemeContext';

interface DirectoryPathProps {
  podName: string;
  directory: string;
  onDirectorySelect: (newDirectory: string) => void;
  onBackToDrive: () => void;
}

const MAX_FOLDERS = 3;
const folderClasses =
  'text-color-accents-purple-heavy dark:text-color-accents-grey-lavendar';
const selectableClasses = 'cursor-pointer hover:bg-color-shade-dark-3-day';

const DirectoryPath = ({
  podName,
  directory,
  onDirectorySelect,
  onBackToDrive,
}: DirectoryPathProps) => {
  const { theme } = useContext(ThemeContext);
  const [folders, displayedFolders] = useMemo(() => {
    const folders = (directory === 'root' ? '' : directory).split('/');
    return [folders, folders.slice(-MAX_FOLDERS)];
  }, [directory]);

  const offset = folders.length - displayedFolders.length;

  const onFolderClick = (index: number) => {
    onDirectorySelect(folders.filter((folder, i) => i <= index).join('/'));
  };

  return (
    <div className="md:ml-0 ml-2 flex items-center">
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
        className={`hidden md:inline ${folderClasses} ${selectableClasses}`}
        onClick={() => onDirectorySelect('root')}
      >
        {podName}
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
