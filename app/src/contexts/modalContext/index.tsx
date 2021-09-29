import React, { createContext, useContext, useState } from 'react';

// Modal variants
import CreateModal from './modals/create';
import GenerateLinkModal from './modals/generateLink';

export interface ModalProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export enum MODAL_VARIANTS {
  CREATING = 'creating',
  GENERATE_LINK = 'generate_link',
}

interface BaseModalVariant {
  type: MODAL_VARIANTS;
  data: unknown;
}

interface CreatingModal extends BaseModalVariant {
  type: MODAL_VARIANTS.CREATING;
  data: {
    type: 'Folder' | 'File' | 'Album' | 'Pod';
    onButtonClicked: () => void;
  };
}

interface GenerateLinkModal extends BaseModalVariant {
  type: MODAL_VARIANTS.GENERATE_LINK;
  data: {
    type: 'Referal' | 'Share';
    link: string;
  };
}

type ModalVariants = CreatingModal | GenerateLinkModal;

interface BaseModalResponse {
  type: MODAL_VARIANTS;
  response: unknown;
}

interface CreatingModalResponse extends BaseModalResponse {
  type: MODAL_VARIANTS.CREATING;
  response: string;
}

interface GenerateLinkModalResponse extends BaseModalResponse {
  type: MODAL_VARIANTS.GENERATE_LINK;
  response: undefined;
}

type ModalResponses = CreatingModalResponse | GenerateLinkModalResponse;

export interface ModalContextProvider {
  openModal: (data: ModalVariants) => void;
  closeModal: () => void;
  modalResponse: ModalResponses;
}

export const ModalContext = createContext({} as ModalContextProvider);

export function ModalProvider({ children }: ModalProviderProps): JSX.Element {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalData, setModalData] = useState<ModalVariants | null>(null);
  const [modalResponse, setModalResponse] = useState<ModalResponses | null>(
    null
  );

  const handleCloseModal = (): void => {
    setIsModalOpened(false);
    setModalData(null);
    setModalResponse(null);
  };

  const handleOpenModal = (data: ModalVariants): void => {
    setModalData(data);
    setIsModalOpened(true);
  };

  const value: ModalContextProvider = {
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
    modalResponse: modalResponse,
  };

  const renderModal = (): JSX.Element => {
    if (modalData.type === MODAL_VARIANTS.CREATING) {
      return (
        <CreateModal
          type={modalData.data.type}
          onButtonClicked={() => modalData.data.onButtonClicked()}
          onModalResponse={(data) =>
            setModalResponse({
              type: MODAL_VARIANTS.CREATING,
              response: data,
            })
          }
          onClose={() => handleCloseModal()}
        />
      );
    }
    if (modalData.type === MODAL_VARIANTS.GENERATE_LINK) {
      return (
        <GenerateLinkModal
          type={modalData.data.type}
          link={modalData.data.link}
          onClose={() => handleCloseModal()}
        />
      );
    }
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {isModalOpened && renderModal()}
    </ModalContext.Provider>
  );
}

export const useModal = (): ModalContextProvider => {
  return useContext(ModalContext);
};
