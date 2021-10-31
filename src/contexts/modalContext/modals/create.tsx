import React, { useEffect, useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';

import BaseModal from 'src/shared/BaseModal/BaseModal';
import BaseInput from 'src/shared/BaseInput/BaseInput';

export interface Props {
  type: 'Folder' | 'File' | 'Album' | 'Pod';
  onButtonClicked: () => void;
  onModalResponse: (data: string) => void;
  onClose: () => void;
}

function CreateModal(props: Props): JSX.Element {
  // Matomo
  const { trackEvent } = useMatomo();

  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    props.onModalResponse(name);
  }, [name]);

  const handleButtonClick = () => {
    trackEvent({
      category: 'Create',
      action: `Create ${props.type}`,
      name: `Create ${props.type}`,
      documentTitle: 'Drive',
      href: 'https://app.fairdrive.fairdatasociety.org/',
    });

    props.onButtonClicked();
  };

  return (
    <BaseModal
      title={`Create New ${props.type}`}
      onClose={() => props.onClose()}
      isButtonDisabled={name === null || name === ''}
      buttonContent={'Create'}
      onButtonClicked={() => handleButtonClick()}
      textBelowBody={`You are about to create a new ${props.type.toLocaleLowerCase()}.`}
    >
      <>
        <BaseInput
          id={`create_new_${props.type}`}
          label={`Name your ${props.type}`}
          placeholder={`${props.type} Name`}
          onChange={(data) => setName(data)}
        />
      </>
    </BaseModal>
  );
}

export default React.memo(CreateModal);
