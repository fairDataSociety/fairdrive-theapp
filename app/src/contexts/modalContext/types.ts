export interface ModalProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export enum MODAL_VARIANTS {
  CREATING = 'creating',
  GENERATE_LINK = 'generate_link',
  IMPORTING = 'importing',
}

interface BaseModalVariant {
  type: MODAL_VARIANTS;
  data: unknown;
}

interface CreatingModal extends BaseModalVariant {
  type: MODAL_VARIANTS.CREATING;
  data: {
    type: 'Folder' | 'File' | 'Album' | 'Pod';
    onButtonClicked: (data: string) => void;
  };
}

interface GenerateLinkModal extends BaseModalVariant {
  type: MODAL_VARIANTS.GENERATE_LINK;
  data: {
    type: 'Referal' | 'Share';
    link: string;
  };
}

interface ImportingModal extends BaseModalVariant {
  type: MODAL_VARIANTS.IMPORTING;
  data: {
    type: 'Pod' | 'File';
    onButtonClicked: (data: string) => void;
  };
}

export type ModalVariants = CreatingModal | GenerateLinkModal | ImportingModal;

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

interface ImportingModalResponse extends BaseModalResponse {
  type: MODAL_VARIANTS.IMPORTING;
  response: string;
}

export type ModalResponses =
  | CreatingModalResponse
  | GenerateLinkModalResponse
  | ImportingModalResponse;

export interface ModalContextProvider {
  openModal: (data: ModalVariants) => void;
  closeModal: () => void;
  modalResponse: ModalResponses;
}
