import Modal from '@components/Modals/Modal';
import TextInput from '@components/Inputs/TextInput/TextInput';
import { Button } from '@components/Buttons';
export interface CreateNewProps {
  showOverlay: boolean;
  setShowOverlay: (showOverlay: boolean) => void;
  type: string;
  onClick: () => void;
  value: string;
  setNewValue: (value: string) => void;
  isRefLink: boolean;
}
function CreateNew({
  type,
  onClick,
  showOverlay,
  setShowOverlay,
  value,
  setNewValue,
  isRefLink,
}: CreateNewProps) {
  return (
    <Modal
      title={isRefLink ? 'Add Link/Pod' : `Create New ${type}`}
      isCentered
      showOverlay={showOverlay}
      closeModal={() => setShowOverlay(!showOverlay)}
    >
      {isRefLink ? (
        <>
          <TextInput
            name={`Link shared with you`}
            label={`Link shared with you`}
            value={value}
            setNewValue={setNewValue}
          ></TextInput>
          <p>You are about to confirm this link</p>
          <Button label="Confirm" variant="secondary" onClick={onClick} />
        </>
      ) : (
        <>
          <TextInput
            name={`Create New ${type}`}
            label={`Name your ${type}`}
            value={value}
            setNewValue={setNewValue}
          ></TextInput>
          <p>You are about to create new {type}</p>
          <Button label="Create" variant="secondary" onClick={onClick} />
        </>
      )}
    </Modal>
  );
}
export default CreateNew;
