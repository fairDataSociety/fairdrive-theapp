import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./fileListStyles";
import FileListHeader from "./fileListHeader/fileListHeader";
import FileListBody from "./fileListBody/fileListBody";
import { StoreContext } from "src/store/store";
import moment from "moment";
import prettyBytes from "pretty-bytes";

import { TCurrentFilter } from "../drive/drive";
import { sortyByCurrentFilter } from "src/store/helpers/sort";

export interface Props {
  currentFilter: TCurrentFilter;
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
        <div>
          {
            state.dirs !== undefined &&
              sortyByCurrentFilter(state.dirs, props.currentFilter).map(
                (directory) => {
                  return (
                    <FileListBody
                      name={directory.name}
                      type={directory.content_type}
                      size={directory.size}
                      created={moment
                        .unix(parseInt(directory.creation_time))
                        .format('DD/MM/YYYY')}
                      modified={moment
                        .unix(parseInt(directory.modification_time))
                        .format('DD/MM/YYYY')}
                      file={directory}
                      isPodBarOpen={props.isPodBarOpen}
                    ></FileListBody>
                  );
                }
              );
          }
          {
            state.entries !== undefined &&
              sortyByCurrentFilter(state.entries, props.currentFilter).map(
                (entry) => {
                  return (
                    <FileListBody
                      name={entry.name}
                      type={entry.content_type}
                      size={prettyBytes(parseInt(entry.size))}
                      created={moment
                        .unix(parseInt(entry.creation_time))
                        .format('DD/MM/YYYY')}
                      modified={moment
                        .unix(parseInt(entry.modification_time))
                        .format('DD/MM/YYYY')}
                      file={entry}
                      isPodBarOpen={props.isPodBarOpen}
                    ></FileListBody>
                  );
                }
              );
          }
        </div>
      </div>
    )
  );
}

export default React.memo(FileList);
