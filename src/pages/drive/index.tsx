/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useState } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useFdpStorage } from '@context/FdpStorageContext';
import ThemeContext from '@context/ThemeContext';
import PodContext from '@context/PodContext';
import SearchContext from '@context/SearchContext';

import {
  getFdpPathByDirectory,
  getFilesAndDirectories,
  getPods,
} from '@api/pod';

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
import { DirectoryItem, FileItem } from '@fairdatasociety/fdp-storage';
import SelectPodCard from '@components/Cards/SelectPodCard/SelectPodCard';
import { getContentItemsCache, saveContentItemsCache } from '@utils/cache';
import { RefreshDriveOptions } from '@interfaces/handlers';
import DirectoryPath from '@components/DirectoryPath/DirectoryPath';

const Drive: FC = () => {
  const { trackPageView } = useMatomo();
  const { theme } = useContext(ThemeContext);
  const { activePod, openPods, setPods, directoryName, setDirectoryName } =
    useContext(PodContext);
  const { search, updateSearch } = useContext(SearchContext);

  const [directories, setDirectories] = useState<DirectoryItem[] | null>(null);
  const [files, setFiles] = useState<FileItem[] | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [driveView, setDriveView] = useState<'grid' | 'list'>('grid');
  const [driveSort, setDriveSort] = useState('a-z');
  const [loading, setLoading] = useState(false);
  const { fdpClient } = useFdpStorage();
  const [fileNameDropdownOpen, setFileNameDropdownOpen] = useState<
    string | null
  >(null);

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

  const handleFetchDrive = async (props?: RefreshDriveOptions) => {
    if (!activePod) {
      return;
    }

    const userAddress = fdpClient.account.wallet.address;
    const directory = directoryName || 'root';
    const fdpPath = getFdpPathByDirectory(directory);

    const cachedItems = getContentItemsCache(
      userAddress,
      activePod,
      fdpPath
    ).contentItems;
    setFiles(cachedItems.files || []);
    setDirectories(cachedItems.directories || []);
    if (props?.isUseCacheOnly) {
      return;
    }

    setLoading(true);

    try {
      const response = await getFilesAndDirectories(
        fdpClient,
        activePod,
        directory
      );
      setFiles(response.files);
      setDirectories(response.directories);
      saveContentItemsCache(
        userAddress,
        activePod,
        fdpPath,
        JSON.stringify(response)
      );
    } catch (e) {
      console.log('Error: Could not fetch directories & files!', e);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchPods = async () => {
    try {
      setLoading(true);
      const response = await getPods(fdpClient);
      setPods(response);
    } catch (error) {
      console.log('Error: Pods could not be fetched (drive index)!');
    } finally {
      setLoading(false);
    }
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

  const handleDirectoryOnClick = (newDirectoryName: string) => {
    if (loading) {
      return;
    }

    setLoading(true);

    if (directoryName !== 'root') {
      setDirectoryName(directoryName + '/' + newDirectoryName);
    } else {
      setDirectoryName(newDirectoryName);
    }

    setLoading(false);
  };

  const handleDirectoryPathChange = (newDirectory: string) => {
    if (loading) {
      return;
    }

    setLoading(true);

    setDirectoryName(newDirectory);

    setLoading(false);
  };

  const handleFileOnClick = (data: FileItem) => {
    setPreviewFile(data);
    setShowPreviewModal(true);
  };

  const handleSearchFilter = (driveItem: DirectoryItem | FileItem) => {
    return driveItem.name.toLowerCase().includes(search.toLocaleLowerCase());
  };

  return (
    <MainLayout updateDrive={handleFetchDrive} refreshPods={handleFetchPods}>
      <div className="block md:hidden">
        <DriveActionHeaderMobile />
      </div>
      <MainHeader
        title={
          <DirectoryPath
            podName={activePod}
            directory={directoryName}
            onDirectorySelect={handleDirectoryPathChange}
          />
        }
        activePod={activePod}
        driveView={driveView}
        toggleView={handleToggleView}
        toggleSort={handleToggleSort}
      />
      <DriveActionBar updateDrive={handleFetchDrive} />
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
              directoryOnClick={handleDirectoryOnClick}
              fileOnClick={handleFileOnClick}
              updateDrive={handleFetchDrive}
              dropdownOpenFileName={fileNameDropdownOpen}
              onDropdownFileNameChange={setFileNameDropdownOpen}
            />
          ) : null}

          {driveView === 'list' ? (
            <DriveListView
              directories={handleSort(directories?.filter(handleSearchFilter))}
              files={handleSort(files?.filter(handleSearchFilter))}
              directoryOnClick={handleDirectoryOnClick}
              fileOnClick={handleFileOnClick}
              updateDrive={handleFetchDrive}
              dropdownOpenFileName={fileNameDropdownOpen}
              onDropdownFileNameChange={setFileNameDropdownOpen}
            />
          ) : null}
        </div>
      ) : loading === false ? (
        activePod ? (
          <EmptyDirectoryCard />
        ) : (
          <SelectPodCard />
        )
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
