/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useRef, useState } from 'react';
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
import {
  errorToString,
  isDataNotFoundError,
  isJsonParsingError,
} from '@utils/error';
import PodList from '@components/Views/PodList/PodList';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { constructPath, rootPathToRelative } from '@utils/filename';

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
  const [error, setError] = useState<string | null>(null);
  const searchControllerRef = useRef<AbortController | null>(null);

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
    setError(null);
    updateSearch('');

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
      } else {
        setError(errorToString(error));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFetchPods = async () => {
    try {
      setError(null);
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

  const handleDirectoryOnClick = (newDirectory: DirectoryItem) => {
    if (loading) {
      return;
    }

    setError(null);

    setLoading(true);

    if (newDirectory.path) {
      setDirectoryName(
        rootPathToRelative(constructPath(newDirectory.path, newDirectory.name))
      );
    } else if (directoryName !== 'root') {
      setDirectoryName(directoryName + '/' + newDirectory.name);
    } else {
      setDirectoryName(newDirectory.name);
    }

    setLoading(false);
  };

  const handleDirectoryPathChange = (newDirectory: string) => {
    if (loading) {
      return;
    }

    setError(null);

    setLoading(true);

    setDirectoryName(newDirectory);

    setLoading(false);
  };

  const handleFileOnClick = (data: FileItem) => {
    setError(null);
    setPreviewFile(data);
    setShowPreviewModal(true);
  };

  const handlePodSelect = (pod: string) => {
    setError(null);
    setActivePod(pod);
    setDirectoryName('root');
  };

  const onBackToDrive = () => {
    setError(null);
    setActivePod('');
    setDirectoryName('');
  };

  const handleSearch = async () => {
    try {
      if (loading || !activePod) {
        return;
      }

      searchControllerRef.current = new AbortController();

      setLoading(true);

      let matchedFiles: FileItem[] = [];
      let matchedDirectories: DirectoryItem[] = [];
      let folders: { path: string; depth: number }[] = [
        { path: '/', depth: 0 },
      ];
      const maxDepth = 3;

      while (folders.length > 0) {
        const { path, depth } = folders.shift();

        let content: DirectoryItem;
        try {
          content = await getFilesAndDirectories(
            fdpClientRef.current,
            activePod,
            path === '/' ? 'root' : path
          );

          // eslint-disable-next-line no-empty
        } catch (error) {
          console.error(error);
        }

        if (searchControllerRef.current.signal.aborted) {
          return;
        }

        if (Array.isArray(content?.files)) {
          matchedFiles = matchedFiles
            .concat(content.files.filter(({ name }) => name.includes(search)))
            .map((file) => {
              file.path = path;
              return file;
            });
        }

        if (Array.isArray(content?.directories)) {
          matchedDirectories = matchedDirectories.concat(
            content.directories
              .filter(({ name }) => name.includes(search))
              .map((directory) => {
                directory.path = path;
                return directory;
              })
          );

          if (depth < maxDepth) {
            folders = folders.concat(
              content.directories.map(({ name }) => ({
                path: constructPath(path, name),
                depth: depth + 1,
              }))
            );
          }
        }
      }

      setFiles(matchedFiles);
      setDirectories(matchedDirectories);
    } catch (error) {
      setError(errorToString(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchControllerRef.current) {
      searchControllerRef.current.abort();
    }

    if (search) {
      handleSearch();
    } else {
      handleUpdateDrive();
    }
  }, [search]);

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
        <div className="mb-5 text-center">
          <FeedbackMessage type="error" message={error} />
        </div>

        {!loading && (
          <div style={{ marginTop: 15 }}>
            {activePod ? (
              directories?.length || files?.length ? (
                <div>
                  {driveView === 'grid' ? (
                    <DriveGridView
                      directories={handleSort(directories)}
                      files={handleSort(files)}
                      directoryOnClick={handleDirectoryOnClick}
                      fileOnClick={handleFileOnClick}
                      updateDrive={handleUpdateDrive}
                    />
                  ) : null}

                  {driveView === 'list' ? (
                    <DriveListView
                      directories={handleSort(directories)}
                      files={handleSort(files)}
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
            )}
          </div>
        )}
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
