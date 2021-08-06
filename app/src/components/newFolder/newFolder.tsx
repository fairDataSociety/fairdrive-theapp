import React, { useContext, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./newFolderStyles";
import CreateNew from "../createNew/createNew";
import { createDirectory } from "../../store/services/fairOS";
export interface Props {
  setResponse: (arg: boolean) => Promise<void>;
}

function NewFolder(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });
  const [folder, setFolderName] = useState<string | null>(null);
  const createFolder = async () => {
    props.setResponse(
      await createDirectory(state.directory, folder, state.podName)
    );
  };
  return (
    <div className={classes.BoilerPlate}>
      <CreateNew
        onClick={createFolder}
        setProp={setFolderName}
        propValue={folder}
        title="New Folder"
        label="Folder Name"
      ></CreateNew>
    </div>
  );
}

export default React.memo(NewFolder);
