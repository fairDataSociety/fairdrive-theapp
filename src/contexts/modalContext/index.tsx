import React, { createContext, useContext, useState } from 'react';

// Modal variants
import CreateModal from './modals/create';
import ImportingModal from './modals/importing';
import GenerateLinkModal from './modals/generateLink';

// Types
import {
  ModalVariants,
  ModalResponses,
  ModalContextProvider,
  ModalProviderProps,
  MODAL_VARIANTS,
} from './types';

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
          onButtonClicked={() =>
            modalData.data.onButtonClicked(modalResponse.response)
          }
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

    if (modalData.type === MODAL_VARIANTS.IMPORTING) {
      return (
        <ImportingModal
          type={modalData.data.type}
          onButtonClicked={() => {
            modalData.data.onButtonClicked(modalResponse.response);
          }}
          onModalResponse={(data) =>
            setModalResponse({
              type: MODAL_VARIANTS.IMPORTING,
              response: data,
            })
          }
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
