import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./fileListStyles";
import FileListHeader from "./fileListHeader";
import FileListBody from "./fileListBody";
import { StoreContext } from "src/store/store";
export interface Props {
  isPodBarOpen: boolean;
}

const dummyFileData = [
  {
    name: "Photos of my cat",
    type: "Image",
    size: "30MB",
    created: "20/05/2021",
    modified: "30/06/2021",
  },
  {
    name: "Top secret recipe",
    type: "PDF",
    size: "20KB",
    created: "20/05/2021",
    modified: "30/06/2021",
  },
  {
    name: "Some map to Narnia",
    type: "PDF",
    size: "300KB",
    created: "20/05/2021",
    modified: "30/06/2021",
  },
];

function FileList(props: Props) {
  const { theme } = useContext(ThemeContext);
  const { state, actions } = useContext(StoreContext);

  const classes = useStyles({ ...props, ...theme });
  return (
    state.entries !== null && (
      <div className={classes.container}>
        <FileListHeader isPodBarOpen={props.isPodBarOpen} />
        <div className={classes.fileContainer}>
          {state.entries !== undefined &&
            state.entries.map((d) => {
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
        </div>
      </div>
    )
  );
}

export default React.memo(FileList);
