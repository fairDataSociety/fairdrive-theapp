import React, { useContext } from "react";
import { ThemeContext } from "../../../store/themeContext/themeContext";
import { StoreContext } from "../../../store/store";
import useStyles from "./openInDappStyles";
import Modal from "../modal/modal";

export interface Props {
  dapp: string;
}

function OpenInDapp(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });

  return (
    <Modal
      heading={`Open in ${props.dapp}`}
      disabledButton="Open"
      icon={true}
      notifyMessage="Coming soon..."
    ></Modal>
  );
}

export default React.memo(OpenInDapp);
