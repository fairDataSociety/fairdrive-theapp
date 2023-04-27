/**
 * Refresh drive options
 */
export interface RefreshDriveOptions {
  isUseCacheOnly: boolean;
}

/**
 * Props for modals which are used to update the content of the drive
 */
export interface UpdateDriveProps {
  updateDrive?: (props?: RefreshDriveOptions) => void;
}

/**
 * Props for modals which are used to create new content
 */
export interface CreatorModalProps extends UpdateDriveProps {
  showModal: boolean;
  closeModal: () => void;
}
