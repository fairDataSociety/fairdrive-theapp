import React, { useEffect, useContext } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';

import { PodProviderContext } from 'src/machines/pod';

import { shortenTitle } from 'src/helpers/utils';
import BaseModal from 'src/shared/BaseModal/BaseModal';
import BaseInput from 'src/shared/BaseInput/BaseInput';

export interface Props {
  type: 'Referal' | 'Share';
  link: string;
  onClose: () => void;
}

function GenerateLinkModal(props: Props): JSX.Element {
  // Matomo
  const { trackEvent } = useMatomo();

  useEffect(() => {
    trackEvent({
      category: 'Share',
      action: 'Open Share Modal',
      name: 'Open Share Modal',
      documentTitle: 'Drive',
      href: 'https://app.fairdrive.fairdatasociety.org/',
    });
  });

  const isReferalType = () => props.type === 'Referal';

  const { PodMachineActions } = useContext(PodProviderContext);

  const handleClose = () => {
    PodMachineActions.onCloseSharePod();
    props.onClose();
  };

  return (
    <BaseModal
      title={`Create New ${props.type}`}
      onClose={handleClose}
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
          clipboardValue={props.link}
          initialValue={shortenTitle(props.link, 5)}
          isDisabled={true}
        />
      </>
    </BaseModal>
  );
}

export default React.memo(GenerateLinkModal);
