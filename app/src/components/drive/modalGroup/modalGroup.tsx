import React from 'react';

// Components
import UploadModal from '../../../components/uploadModal/uploadModal';
import { CreateNew } from '../../modals/createNew/createNew';

// Hooks
import useStyles from './modalGroupStyles';
import { Modal } from '@material-ui/core';

export interface Props {
  folderName: string;
  setFolderName: (value: string) => void;
  fileName: string;
  setFileName: (value: string) => void;
  isCreateFolderModalVisible: boolean;
  isImportFileModalVisible: boolean;
  isUploadFileModalVisible: boolean;
  onCreateNewFolder: () => Promise<void>;
  onCreateNewFile: () => Promise<void>;
  onCloseCreateFolderModal: () => void;
  onCloseImportFileModal: () => void;
  onCloseUploadFileModal: () => void;
}

export const DriveModalGroup = (props: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <UploadModal
        isModalVisible={props.isUploadFileModalVisible}
        onCloseModal={() => props.onCloseUploadFileModal()}
      />

      <Modal
        className={classes.modalContainer}
        open={props.isCreateFolderModalVisible}
        onClose={() => props.onCloseCreateFolderModal()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CreateNew
          handleClick={props.onCreateNewFolder}
          handleClose={() => props.onCloseCreateFolderModal()}
          setProp={(data) => props.setFolderName(data)}
          propValue={props.folderName}
          type="Folder"
        ></CreateNew>
      </Modal>

      <Modal
        className={classes.modalContainer}
        open={props.isImportFileModalVisible}
        onClose={() => props.onCloseImportFileModal()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CreateNew
          handleClick={props.onCreateNewFile}
          handleClose={() => props.onCloseImportFileModal()}
          setProp={(data) => props.setFileName(data)}
          propValue={props.fileName}
          isRefLink={true}
          type="File"
        ></CreateNew>
      </Modal>
    </>
  );
};
