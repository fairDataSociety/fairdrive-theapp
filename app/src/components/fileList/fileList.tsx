import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./fileListStyles";
import FileListHeader from "./fileListHeader";
import FileListBody from "./fileListBody";
export interface Props {}

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
  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.container}>
      <FileListHeader />
      <div className={classes.fileContainer}>
        {dummyFileData.map((d) => {
          return (
            <FileListBody
              name={d.name}
              type={d.type}
              size={d.size}
              created={d.created}
              modified={d.modified}
              file={d}
            ></FileListBody>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(FileList);
