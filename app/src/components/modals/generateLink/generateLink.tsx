import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../store/themeContext/themeContext";
import CopyToClipboard from "react-copy-to-clipboard";
import useStyles from "./generateLinkStyles";
import Modal from "../modal/modal";
import { Copy, Complete } from "../../icons/icons";

type Variants = "share" | "refer";
export interface Props {
  type?: string;
  notifyMessage?: string;
  handleClose?: () => void;
  link?: string;
  variant: Variants;
}

function GenerateLink(props: Props) {
  const { theme } = useContext(ThemeContext);
  const [copied, setCopied] = useState(false);
  const classes = useStyles({ ...props, ...theme });

  const copyHandler = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const { link } = props;

  const shortLink = `${link.slice(0, 6)}...${link.slice(link.length - 5)}`;

  return (
    <Modal
      icon={true}
      heading={
        props.variant === "refer"
          ? "Generate Referral Link"
          : "Generate Share Link"
      }
      notifyMessage={
        props.variant === "refer"
          ? "Invite a friend to use FairDrive by using this link"
          : "Share this Material with a friend via this link"
      }
      handleClose={props.handleClose}
    >
      <p className={classes.label}>
        {props.variant === "refer" ? "Refer a friend" : "Sharing Link"}
      </p>

      <div className={classes.body}>
        <p>{copied ? "Copied!" : shortLink}</p>
        <CopyToClipboard onCopy={copyHandler} text={props.link}>
          {copied ? (
            <Complete className={classes.icon} />
          ) : (
            <button>
              <Copy className={classes.icon} />
            </button>
          )}
        </CopyToClipboard>
      </div>
    </Modal>
  );
}

export default React.memo(GenerateLink);
