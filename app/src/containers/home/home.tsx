import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import { Redirect, useParams, useHistory } from "react-router-dom";
import useStyles from "./homeStyles";
import CardGrid from "../../components/cardGrid/cardGrid";
import FileCard from "../../components/cards/fileCard";
import { getDirectory } from "../../store/services/fairOS";
import FileModal from "../../components/fileModal/fileModal";
export interface Props {
  directory?: string;
}

function Home(props: Props) {
  const params: any = useParams();
  const path = params.path;
  const { state, actions } = useContext(StoreContext);
  const [files, setFiles] = useState(null);

  //Add action to load files
  async function loadDirectory() {
    try {
      const newPath = path.replace(/&/g, "/");
      const res = await getDirectory({
        directory: newPath,
        password: state.password,
      });
      setFiles(res.entries);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadDirectory();
  }, [params]);

  useEffect(() => {
    if (state.entries !== null && files === null) {
      console.log(state.entries);
      setFiles(state.entries);
    }
  }, [state.entries]);

  return (
    <CardGrid>
      {!state.password && <Redirect to={"/"} />}
      {files !== null &&
        files.map((file) =>
          file.content_type === "inode/directory" ? (
            <FileCard file={file} />
          ) : (
            <FileModal file={file}></FileModal>
          )
        )}
    </CardGrid>
  );
}

export default React.memo(Home);
