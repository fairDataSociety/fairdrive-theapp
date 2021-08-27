import React from 'react';

// Components
import { CreateNew } from '../../modals/createNew/createNew';

// Hooks
import { Modal } from '@material-ui/core';

export interface Props {
  folderName: string;
  setFolderName: (value: string) => void;
  fileName: string;
  setFileName: (value: string) => void;
  isCreateFolderModalVisible: boolean;
  isImportFileModalVisible: boolean;
  onCreateNewFolder: () => Promise<void>;
  onCreateNewFile: () => Promise<void>;
  onCloseCreateFolderModal: () => void;
  onCloseImportFileModal: () => void;
}

export const DriveModalGroup = (props: Props): JSX.Element => {
  return (
    <>
      <Modal
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
