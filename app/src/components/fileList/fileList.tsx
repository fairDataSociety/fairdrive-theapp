import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./fileListStyles";
import FileListHeader from "./fileListHeader";
import FileListBody from "./fileListBody";
import { StoreContext } from "src/store/store";
export interface Props {
  isPodBarOpen: boolean;
}

function FileList(props: Props) {
  const { theme } = useContext(ThemeContext);
  const { state } = useContext(StoreContext);

  const classes = useStyles({ ...props, ...theme });
  return (
    state.entries !== null && (
      <div className={classes.container}>
        <FileListHeader isPodBarOpen={props.isPodBarOpen} />
        <div className={classes.fileContainer}>
          {state.dirs !== undefined &&
            state.dirs.map((d) => {
              return (
                <FileListBody
                  name={d.name}
                  type={d.type}
                  size={d.size}
                  created={d.created}
                  modified={d.modified}
                  file={d}
                  isPodBarOpen={props.isPodBarOpen}
                ></FileListBody>
              );
            })}
          {state.entries !== undefined &&
            state.entries.map((d) => {
              return (
                <FileListBody
                  name={d.name}
                  type={d.content_type}
                  size={d.size}
                  created={d.creation_date}
                  modified={d.date_modified}
                  file={d}
                  isPodBarOpen={props.isPodBarOpen}
                ></FileListBody>
              );
            })}
        </div>
      </div>
    )
  );
}

export default React.memo(FileList);
