import React, { useContext, useEffect, useState } from "react";
import CardWrapper from "./cardWrapper/cardWrapper";
import CardHeader from "./cardHeader/cardHeader";
import CardBody from "./cardBody/cardBody";
import { InfoIcon, Folder } from "../icons/icons";
import { useHistory } from "react-router-dom";
import prettyBytes from "pretty-bytes";
import moment from "moment";
import actionTypes from "../../store/actionTypes";
import { StoreContext } from "../../store/store";
import { ThemeContext } from "../../store/themeContext/themeContext";
import DropDown from "../dropDown/dropDown";
import useStyles from "./fileCardStyles";
type Sizes = "small" | "regular" | "big";
export interface Props {
  size?: Sizes;
  file: any;
  isDirectory: boolean;
}

function FileCard(props: Props) {
  const { file } = props;
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const history = useHistory();
  async function onFileClick() {
    if (file.content_type === "inode/directory") {
      const newDirectory =
        state.directory !== "root"
          ? state.directory + "/" + file.name
          : file.name;
      actions.setDirectory(newDirectory);
    }
  }

  const [fileSize, setFileSize] = useState("");
  const [fileCreateDate, setFileCreateDate] = useState("");
  const [fileModDate, setFileModDate] = useState("");
  const [Icon, setIcon] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    file.content_type === "inode/directory"
      ? setIcon(Folder)
      : setIcon(InfoIcon);
    if (file.size) {
      setFileSize(prettyBytes(parseInt(file.size)));
      setFileCreateDate(
        moment.unix(file.creation_time).format("DD/MM/YYYY HH:mm:ss")
      );
      setFileModDate(
        moment.unix(file.modification_time).format("DD/MM/YYYY HH:mm:ss")
      );
    }
  }, [file]);

  const handleClick = () => {
    setDropdown(!dropdown);
  };

  return (
    <>
      <CardWrapper onFileClick={onFileClick} size={props.size}>
        <CardHeader
          isDirectory={props.isDirectory}
          Icon={Icon}
          heading={file.name}
          handleClick={handleClick}
        />
        <CardBody
          fileSize={fileSize}
          dateCreated={fileCreateDate}
          isDirectory={props.isDirectory}
        />
        {dropdown && (
        <div className={classes.dropdown}>
        <DropDown variant="primary" heading="Preview">
          <ul>
           <li className={classes.listItem}>Hide</li>
           <li className={classes.listItem}>View Hidden Files</li>
           <li className={classes.listItem}>Download</li>
           <li className={classes.listItem}>Accept and Open</li>
          </ul>
        </DropDown>
        </div>
      )}
      </CardWrapper>
    </>
  );
}

export default React.memo(FileCard);
