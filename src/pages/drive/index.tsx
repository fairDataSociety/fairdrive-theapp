/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useState, useEffect } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useFdpStorage } from '@context/FdpStorageContext';
import ThemeContext from '@context/ThemeContext';
import PodContext from '@context/PodContext';
import SearchContext from '@context/SearchContext';

import { getFilesAndDirectories, getPods } from '@api/pod';
import { FileResponse } from '@api/files';

import { MainLayout } from '@components/Layouts';
import { MainHeader } from '@components/Headers';
import { DriveActionBar } from '@components/NavigationBars';
import { DriveGridView, DriveListView } from '@components/Views';
import { PreviewFileModal } from '@components/Modals';
import { EmptyDirectoryCard } from '@components/Cards';

import SearchResultsLightIcon from '@media/UI/search-results-light.svg';
import SearchResultsDarkIcon from '@media/UI/search-results-dark.svg';
import Spinner from '@components/Spinner/Spinner';
import DriveActionHeaderMobile from '@components/NavigationBars/DriveActionBar/DriveActionHeaderMobile';

const Drive: FC = () => {
  const { trackPageView } = useMatomo();
  const { theme } = useContext(ThemeContext);
  const { activePod, openPods, setPods, directoryName, setDirectoryName } =
    useContext(PodContext);
  const { search, updateSearch } = useContext(SearchContext);

  const [directories, setDirectories] = useState(null);
  const [files, setFiles] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [driveView, setDriveView] = useState<'grid' | 'list'>('grid');
  const [driveSort, setDriveSort] = useState('a-z');
  const [loading, setLoading] = useState(false);
  const { fdpClient } = useFdpStorage();

  useEffect(() => {
    trackPageView({
      documentTitle: 'Drive Page',
      href: window.location.href,
    });
  }, []);

  useEffect(() => {
    updateSearch('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleFetchDrive();
  }, [activePod, directoryName, openPods]);

  const handleFetchDrive = async () => {
    setLoading(true);

    getFilesAndDirectories(fdpClient, activePod, directoryName || 'root')
      .then((response) => {
        setFiles(response.files);
        setDirectories(response.dirs);
      })
      .catch(() => console.log('Error: Could not fetch directories & files!'))
      .finally(() => setLoading(false));
  };

  const handleFetchPods = () => {
    setLoading(true);
    getPods(fdpClient)
      .then((response) => {
        setPods(response);
      })
      .catch(() => console.log('Error: Pods could not be fetched!'))
      .finally(() => setLoading(false));
  };

  const handleToggleView = () => {
    if (driveView === 'grid') {
      setDriveView('list');
    } else {
      setDriveView('grid');
    }
  };

  const handleSort = (data: { name: string }[]): any[] => {
    return data?.sort((a, b) =>
      (driveSort === 'a-z' ? a.name > b.name : a.name < b.name) ? 1 : -1
    );
  };

  const handleToggleSort = () => {
    if (driveSort === 'a-z') {
      setDriveSort('z-a');
    } else {
      setDriveSort('a-z');
    }
  };

  const handleDirectyOnClick = (newDirectoryName: string) => {
    if (!loading) {
      setLoading(true);

      if (directoryName !== 'root') {
        setDirectoryName(directoryName + '/' + newDirectoryName);
      } else {
        setDirectoryName(newDirectoryName);
      }

      setLoading(false);
    }
  };

  const handleFileOnClick = (data: FileResponse) => {
    setPreviewFile(data);
    setShowPreviewModal(true);
  };

  const handleSearchFilter = (driveItem: FileResponse) => {
    return driveItem.name.toLowerCase().includes(search.toLocaleLowerCase());
  };

  return (
    <MainLayout refreshDrive={handleFetchDrive} refreshPods={handleFetchPods}>
      <div className="block md:hidden">
        <DriveActionHeaderMobile />
      </div>
      <MainHeader
        title={
          <>
            <span className="hidden md:inline">{activePod} | </span>
            <span>{directoryName}</span>
          </>
        }
        driveView={driveView}
        toggleView={handleToggleView}
        toggleSort={handleToggleSort}
      />
      <DriveActionBar refreshDrive={handleFetchDrive} />
      {search.length > 0 ? (
        <div className="flex justify-start items-center mt-10 mb-5">
          <span>
            {theme === 'light' ? (
              <SearchResultsLightIcon className="inline-block mr-2" />
            ) : (
              <SearchResultsDarkIcon className="inline-block mr-2" />
            )}
          </span>

          <span className="text-2xl font-semibold text-color-accents-grey-lavendar">
            {search}
          </span>
        </div>
      ) : null}
      <Spinner isLoading={loading} />
      {directories?.length || files?.length ? (
        <div>
          {driveView === 'grid' ? (
            <DriveGridView
              directories={handleSort(directories?.filter(handleSearchFilter))}
              files={handleSort(files?.filter(handleSearchFilter))}
              directoryOnClick={handleDirectyOnClick}
              fileOnClick={handleFileOnClick}
              updateDrive={handleFetchDrive}
            />
          ) : null}

          {driveView === 'list' ? (
            <DriveListView
              directories={handleSort(directories?.filter(handleSearchFilter))}
              files={handleSort(files?.filter(handleSearchFilter))}
              directoryOnClick={handleDirectyOnClick}
              fileOnClick={handleFileOnClick}
              updateDrive={handleFetchDrive}
            />
          ) : null}
        </div>
      ) : loading === false ? (
        <EmptyDirectoryCard />
      ) : null}
      {showPreviewModal ? (
        <PreviewFileModal
          showModal={showPreviewModal}
          closeModal={() => setShowPreviewModal(false)}
          previewFile={previewFile}
          updateDrive={handleFetchDrive}
        />
      ) : null}
    </MainLayout>
  );
};

export default Drive;
