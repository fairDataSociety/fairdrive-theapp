import React from 'react';

import BaseModal from 'src/shared/BaseModal/BaseModal';
import BaseInput from 'src/shared/BaseInput/BaseInput';

export interface Props {
  type: 'Referal' | 'Share';
  link: string;
  onClose: () => void;
}

function GenerateLinkModal(props: Props): JSX.Element {
  const isReferalType = () => props.type === 'Referal';

  return (
    <BaseModal
      title={`Create New ${props.type}`}
      onClose={() => props.onClose()}
      textBelowBody={
        isReferalType()
          ? 'Invite a friend to use Fair Drive by using this link '
          : 'Share this Material with a friend via this link'
      }
    >
      <>
        <BaseInput
          id={'GeneratedLinkInput'}
          label={isReferalType() ? 'Refer a friend' : 'Sharing link'}
          allowForClipboarding={true}
          initialValue={props.link}
          isDisabled={true}
        />
      </>
    </BaseModal>
  );
}

export default React.memo(GenerateLinkModal);
