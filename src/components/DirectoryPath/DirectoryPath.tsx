import { useMemo } from 'react';

interface DirectoryPathProps {
  podName: string;
  directory: string;
  onDirectorySelect: (newDirectory: string) => void;
}

const MAX_FOLDERS = 3;
const folderClasses =
  'text-color-accents-purple-heavy dark:text-color-accents-grey-lavendar';
const selectebleClasses = 'cursor-pointer hover:bg-color-shade-dark-3-day';

const DirectoryPath = ({
  podName,
  directory,
  onDirectorySelect,
}: DirectoryPathProps) => {
  const [folders, displayedFolders] = useMemo(() => {
    const folders = (directory === 'root' ? '' : directory).split('/');
    return [folders, folders.slice(-MAX_FOLDERS)];
  }, [directory]);

  const offset = folders.length - displayedFolders.length;

  const onFolderClick = (index: number) => {
    onDirectorySelect(folders.filter((folder, i) => i <= index).join('/'));
  };

  return (
    <>
      <span
        className={`hidden md:inline ${folderClasses} ${selectebleClasses}`}
        onClick={() => onDirectorySelect('root')}
      >
        {podName}
      </span>
      {offset > 0 && <span className={folderClasses}>&nbsp;/ ...</span>}
      {displayedFolders.map((folder, index) => (
        <span className={folderClasses} key={index}>
          &nbsp;/&nbsp;
          <a
            className={selectebleClasses}
            onClick={() => onFolderClick(offset + index)}
          >
            {folder}
          </a>
        </span>
      ))}
    </>
  );
};

export default DirectoryPath;
