import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import { Redirect } from "react-router-dom";
import useStyles from "./homeStyles";
import CardGrid from "../../components/cardGrid/cardGrid";
import FileCard from "../../components/cards/fileCard";
import { openPod } from "../../store/services/fairOS";
export interface Props {}

function BoilerPlate(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const [loadFiles, setLoadfiles] = useState(false);
  const [files, setFiles] = useState(null);
  const classes = useStyles({ ...props, ...theme });
  async function getDirectory() {
    try {
      await actions.getDirectory({
        directory: "root",
        password: state.password,
      });
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (!loadFiles) {
      getDirectory();
      setLoadfiles(true);
    }
  });

  useEffect(() => {
    if (state.entries !== null) {
      console.log(state.entries);
      setFiles(state.entries);
    }
  }, [state.entries]);

  return (
    <CardGrid>
      {!state.password && <Redirect to={"/"} />}
      {files !== null &&
        files.map((file) => (
          <FileCard
            fileName={file.name}
            fileSize={file.size}
            dateCreated={file.dateCreated}
          />
        ))}
    </CardGrid>
  );
}

export default React.memo(BoilerPlate);
