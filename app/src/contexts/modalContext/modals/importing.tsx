import React, { useEffect, useState } from 'react';

import BaseModal from 'src/shared/BaseModal/BaseModal';
import BaseInput from 'src/shared/BaseInput/BaseInput';

export interface Props {
  type: 'Pod' | 'File';
  onButtonClicked: () => void;
  onModalResponse: (data: string) => void;
  onClose: () => void;
}

function ImportingModal(props: Props): JSX.Element {
  const [link, setLink] = useState<string | null>(null);

  useEffect(() => {
    props.onModalResponse(link);
  }, [link]);

  return (
    <BaseModal
      title={`Importing ${props.type}`}
      onClose={() => props.onClose()}
      isButtonDisabled={link === null || link === ''}
      buttonContent={'Import'}
      onButtonClicked={() => props.onButtonClicked()}
      textBelowBody={`You are about to import ${props.type.toLocaleLowerCase()}.`}
    >
      <>
        <BaseInput
          id={`import_${props.type}`}
          label={`Paste your link`}
          placeholder={`${props.type} link`}
          onChange={(data) => setLink(data)}
        />
      </>
    </BaseModal>
  );
}

export default React.memo(ImportingModal);
