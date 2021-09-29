import React, { useEffect, useState } from 'react';

import BaseModal from 'src/shared/BaseModal/BaseModal';
import BaseInput from 'src/shared/BaseInput/BaseInput';

export interface Props {
  type: 'Folder' | 'File' | 'Album';
  onModalResponse: (data: string) => void;
  onClose: () => void;
}

function CreateModal(props: Props): JSX.Element {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    props.onModalResponse(name);
  }, [name]);

  return (
    <BaseModal
      title={`Create New ${props.type}`}
      onClose={() => props.onClose()}
      isButtonDisabled={name === null || name === ''}
    >
      <>
        <BaseInput
          id={`create_new_${props.type}`}
          label={`Name your ${props.type}`}
          placeholder={`${props.type} Name`}
          onChange={(data) => setName(data)}
        />
        You are about to create a new {props.type.toLocaleLowerCase()}.
      </>
    </BaseModal>
  );
}

export default React.memo(CreateModal);
