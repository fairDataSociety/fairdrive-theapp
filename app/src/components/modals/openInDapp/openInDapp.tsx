import React from 'react';
import Modal from '../modal/modal';

export interface Props {
  dapp: string;
  handleClose: () => void;
}

function OpenInDapp(props: Props) {
  return (
    <Modal
      heading={`Open in ${props.dapp}`}
      disabledButton="Open"
      icon={true}
      notifyMessage="Coming soon..."
      handleClose={props.handleClose}
    ></Modal>
  );
}

export default React.memo(OpenInDapp);
