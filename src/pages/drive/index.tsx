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
import { PreviewFileModal, UploadFileModal } from '@components/Modals';
import { EmptyDirectoryCard } from '@components/Cards';

import SearchResultsLightIcon from '@media/UI/search-results-light.svg';
import SearchResultsDarkIcon from '@media/UI/search-results-dark.svg';
import Spinner from '@components/Spinner/Spinner';
import DriveActionHeaderMobile from '@components/NavigationBars/DriveActionBar/DriveActionHeaderMobile';
import { DirectoryItem, FileItem } from '@fairdatasociety/fdp-storage';
import {
  CacheType,
  getCache,
  getContentItemsCache,
  invalidateCache,
  InvalidationResult,
  saveContentItemsCache,
} from '@utils/cache';
import { RefreshDriveOptions } from '@interfaces/handlers';
import DirectoryPath from '@components/DirectoryPath/DirectoryPath';
import { isDataNotFoundError, isJsonParsingError } from '@utils/error';
import PodList from '@components/Views/PodList/PodList';

const Drive: FC = () => {
  const { trackPageView } = useMatomo();
  const { theme } = useContext(ThemeContext);
  const {
    loading,
    setLoading,
    pods,
    activePod,
    setActivePod,
    openPods,
    setPods,
    directoryName,
    setDirectoryName,
    clearPodContext,
  } = useContext(PodContext);
  const { search, updateSearch } = useContext(SearchContext);

  const [showUploadFileModal, setShowUploadFileModal] =
    useState<boolean>(false);
  const [directories, setDirectories] = useState<DirectoryItem[] | null>(null);
  const [files, setFiles] = useState<FileItem[] | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [driveView, setDriveView] = useState<'grid' | 'list'>('grid');
  const [driveSort, setDriveSort] = useState('a-z');
  const { fdpClientRef, getAccountAddress } = useFdpStorage();

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
    handleUpdateDrive();
  }, [activePod, directoryName, openPods]);

  const handleUpdateDrive = async (props?: RefreshDriveOptions) => {
    if (!activePod) {
      return;
    }

    const userAddress = await getAccountAddress();
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
        fdpClientRef.current,
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
      if (isDataNotFoundError(e) || isJsonParsingError(e)) {
        const invalidationResult = invalidateCache(
          userAddress,
          activePod,
          fdpPath
        );
        if (invalidationResult === InvalidationResult.FULL) {
          // update FDP cache if it is available
          if (fdpClientRef.current?.cache?.object) {
            fdpClientRef.current.cache.object = JSON.parse(
              getCache(CacheType.FDP)
            );
          }

          clearPodContext();
          setDirectories(null);
          setFiles(null);
          await handleFetchPods();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFetchPods = async () => {
    try {
      setLoading(true);
      const response = await getPods(fdpClientRef.current);
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

  const handlePodSelect = (pod: string) => {
    setActivePod(pod);
    setDirectoryName('root');
  };

  const onBackToDrive = () => {
    setActivePod('');
    setDirectoryName('');
  };

  return (
    <MainLayout updateDrive={handleUpdateDrive} refreshPods={handleFetchPods}>
      <div className="flex flex-col">
        <div className="flex md:hidden">
          <DriveActionHeaderMobile
            podName={activePod}
            directory={directoryName}
            onDirectorySelect={handleDirectoryPathChange}
            onBackToDrive={onBackToDrive}
          />
        </div>
        <MainHeader
          title={
            <DirectoryPath
              className="hidden md:flex"
              podName={activePod}
              directory={directoryName}
              onDirectorySelect={handleDirectoryPathChange}
              onBackToDrive={onBackToDrive}
            />
          }
          activePod={activePod}
          driveView={driveView}
          toggleView={handleToggleView}
          toggleSort={handleToggleSort}
        />
        <DriveActionBar
          updateDrive={handleUpdateDrive}
          onFileUploadClick={() => setShowUploadFileModal(true)}
        />
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
        <Spinner isLoading={loading || !pods} />

        {!loading &&
          (activePod ? (
            directories?.length || files?.length ? (
              <div>
                {driveView === 'grid' ? (
                  <DriveGridView
                    directories={handleSort(
                      directories?.filter(handleSearchFilter)
                    )}
                    files={handleSort(files?.filter(handleSearchFilter))}
                    directoryOnClick={handleDirectoryOnClick}
                    fileOnClick={handleFileOnClick}
                    updateDrive={handleUpdateDrive}
                  />
                ) : null}

                {driveView === 'list' ? (
                  <DriveListView
                    directories={handleSort(
                      directories?.filter(handleSearchFilter)
                    )}
                    files={handleSort(files?.filter(handleSearchFilter))}
                    directoryOnClick={handleDirectoryOnClick}
                    fileOnClick={handleFileOnClick}
                    updateDrive={handleUpdateDrive}
                  />
                ) : null}
              </div>
            ) : (
              <EmptyDirectoryCard
                onUploadClick={() => setShowUploadFileModal(true)}
              />
            )
          ) : (
            <PodList pods={pods} onPodSelect={handlePodSelect} />
          ))}
        {showUploadFileModal && (
          <UploadFileModal
            showModal={showUploadFileModal}
            closeModal={() => setShowUploadFileModal(false)}
            updateDrive={handleUpdateDrive}
          />
        )}

        {showPreviewModal ? (
          <PreviewFileModal
            showModal={showPreviewModal}
            closeModal={() => setShowPreviewModal(false)}
            previewFile={previewFile}
            updateDrive={handleUpdateDrive}
          />
        ) : null}
      </div>
    </MainLayout>
  );
};

export default Drive;
