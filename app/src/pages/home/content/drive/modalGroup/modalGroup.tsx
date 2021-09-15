import React from 'react';

// Components
import { CreateNew } from 'src/components/modals/createNew/createNew';
import GenerateLink from 'src/components/modals/generateLink/generateLink';

// Hooks
import { Modal } from '@material-ui/core';

export interface Props {
  folderName: string;
  fileName: string;
  setFolderName: (value: string) => void;
  setFileName: (value: string) => void;

  createFolderModal: {
    isCreateFolderModalVisible: () => boolean;
    onCreate: () => Promise<void>;
    onClose: () => void;
  };
  createFileModal: {
    isCreateFileModalVisible: () => boolean;
    onCreate: () => Promise<void>;
    onClose: () => void;
  };
  sharePodModal: {
    isSharePodModalVisible: () => boolean;
    refLink: () => string;
    onClose: () => void;
  };
}

export const DriveModalGroup = (props: Props): JSX.Element => {
  return (
    <>
      <Modal
        open={props.createFolderModal.isCreateFolderModalVisible()}
        onClose={() => props.createFolderModal.onClose()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CreateNew
          handleClick={() => props.createFolderModal.onCreate()}
          handleClose={() => props.createFolderModal.onClose()}
          setProp={(data) => props.setFolderName(data)}
          propValue={props.folderName}
          type="Folder"
        ></CreateNew>
      </Modal>

      <Modal
        open={props.createFileModal.isCreateFileModalVisible()}
        onClose={() => props.createFileModal.onClose()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CreateNew
          handleClick={() => props.createFileModal.onCreate()}
          handleClose={() => props.createFileModal.onClose()}
          setProp={(data) => props.setFileName(data)}
          propValue={props.fileName}
          isRefLink={true}
          type="File"
        ></CreateNew>
      </Modal>

      {props.sharePodModal.isSharePodModalVisible() &&
        props.sharePodModal.refLink() && (
          <GenerateLink
            handleClose={() => props.sharePodModal.onClose()}
            link={props.sharePodModal.refLink()}
            variant="share"
            notifyMessage="Share this Pod with a friend via this reference"
          />
        )}
    </>
  );
};
