import { createMachine, assign } from 'xstate';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
const zip = JSZip();

import * as FileService from 'src/services/file';

import STATES from './states';
import EVENTS from './events';

import { IFile } from 'src/types/models/File';

export interface DownloadContext {
  fileToDownloadData: {
    pod: string;
    directory: string;
    file: string;
  } | null;
  folderToDownloadData: {
    pod: string;
    directory: string;
    files: IFile[];
  } | null;
}

export type DownloadEvents =
  | {
      type: EVENTS.DOWNLOAD_FILE;
      payload: {
        pod: string;
        directory: string;
        file: string;
      };
    }
  | {
      type: EVENTS.DOWNLOAD_FOLDER;
      payload: {
        pod: string;
        directory: string;
        files: IFile[];
      };
    };

const createDownloadMachine = createMachine<DownloadContext, DownloadEvents>({
  id: STATES.STATE_ROOT,
  initial: STATES.IDLE,
  context: {
    fileToDownloadData: null,
    folderToDownloadData: null,
  },
  states: {
    [STATES.IDLE]: {
      on: {
        [EVENTS.DOWNLOAD_FILE]: {
          target: STATES.DOWNLOAD_FILE,
          actions: assign({
            fileToDownloadData: (_, { payload }) => payload,
          }),
        },
        [EVENTS.DOWNLOAD_FOLDER]: {
          target: STATES.DOWNLOAD_FOLDER,
          actions: assign({
            folderToDownloadData: (_, { payload }) => payload,
          }),
        },
      },
    },
    [STATES.DOWNLOAD_FILE]: {
      initial: STATES.DOWNLOAD_FILE_LOADING,
      states: {
        [STATES.DOWNLOAD_FILE_LOADING]: {
          invoke: {
            id: 'downloadFile',
            src: (ctx) => {
              return FileService.downloadFile(
                ctx.fileToDownloadData.file,
                ctx.fileToDownloadData.directory,
                ctx.fileToDownloadData.pod
              ).then((result) => {
                FileSaver.saveAs(result, ctx.fileToDownloadData.file);
              });
            },
            onDone: {
              target: STATES.DOWNLOAD_FILE_SUCCESS,
              actions: assign((_) => {
                return {
                  fileToDownloadData: null,
                };
              }),
            },
            onError: {
              target: STATES.DOWNLOAD_FILE_FAILED,
              actions: assign((_) => {
                return {
                  fileToDownloadData: null,
                };
              }),
            },
          },
        },
        [STATES.DOWNLOAD_FILE_SUCCESS]: {
          always: [{ target: `#${STATES.STATE_ROOT}.${STATES.IDLE}` }],
        },
        [STATES.DOWNLOAD_FILE_FAILED]: {
          always: [{ target: `#${STATES.STATE_ROOT}.${STATES.IDLE}` }],
        },
      },
    },
    [STATES.DOWNLOAD_FOLDER]: {
      initial: STATES.DOWNLOAD_FOLDER_LOADING,
      states: {
        [STATES.DOWNLOAD_FOLDER_LOADING]: {
          invoke: {
            id: 'downloadFolder',
            src: (ctx) => {
              for (const file of ctx.folderToDownloadData.files) {
                zip.file(
                  file.name,
                  FileService.downloadFile(
                    file.name,
                    ctx.folderToDownloadData.directory,
                    ctx.folderToDownloadData.pod
                  )
                );
              }

              return zip.generateAsync({ type: 'blob' }).then((zipFile) => {
                FileSaver.saveAs(
                  zipFile,
                  ctx.folderToDownloadData.directory + '.zip'
                );
              });
            },
            onDone: {
              target: STATES.DOWNLOAD_FOLDER_SUCCESS,
              actions: assign((_) => {
                return {
                  folderToDownloadData: null,
                };
              }),
            },
            onError: {
              target: STATES.DOWNLOAD_FOLDER_FAILED,
              actions: assign((_) => {
                return {
                  folderToDownloadData: null,
                };
              }),
            },
          },
        },
        [STATES.DOWNLOAD_FOLDER_SUCCESS]: {
          always: [{ target: `#${STATES.STATE_ROOT}.${STATES.IDLE}` }],
        },
        [STATES.DOWNLOAD_FOLDER_FAILED]: {
          always: [{ target: `#${STATES.STATE_ROOT}.${STATES.IDLE}` }],
        },
      },
    },
  },
});

export default createDownloadMachine;
