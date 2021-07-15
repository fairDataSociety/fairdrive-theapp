import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./podSidebarStyles";
import Toggle from "../toggle/toggle";
import { createPod, receivePod } from "../../store/services/fairOS";
import { PodChevron, PodInfo } from "../icons/icons";
import { Modal, setRef } from "@material-ui/core";
import CreateNew from "../modals/createNew/createNew";

export interface Props {
  isOpen: boolean;
  route: string;
}

function PodSidebar(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const [isPrivate, setIsPrivate] = useState(true);
  const classes = useStyles({ ...props, ...theme });
  const pods = ["Private Pod", "Shared Pod", "My Photos"];
  const [open, setOpen] = useState(false);
  const [podName, setPodName] = useState("");
  const [podCreated, setPodCreated] = useState(false);
  const [podRef, setPodRef] = useState("");

  useEffect(() => {
    if (state.podsOpened.includes(state.podName)) {
      actions.getDirectory({
        directory: state.directory,
        podName: state.podName,
      });
    }
    // eslint-disable-next-line
  }, [state.podName, state.podsOpened]);

  const setPod = async (pod) => {
    actions.setPodName(pod);
    actions.setDirectory("root");
    if (!state.podsOpened.includes(pod))
      actions.openPod({ password: state.password, podName: pod });
  };
  const handleClose = () => {
    setOpen(false);
    setPodName("");
    setPodRef("");
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const setOverview = async (pod) => {
    // await actions.setPodName(pod);
    // if (!state.podsOpened.includes(pod))
    //   await actions.openPod({ password: state.password, podName: pod });
  };
  const createNewPod = async () => {
    await createPod({ password: state.password, podName });
    handleClose();
    setPodCreated(true);
  };
  useEffect(() => {
    actions.getPods();
    setPodCreated(false);
    // eslint-disable-next-line
  }, [podCreated]);

  useEffect(() => {
    actions.setPrivatePod(isPrivate);
    // eslint-disable-next-line
  }, [isPrivate]);

  const importPod = async () => {
    receivePod({ podReference: podRef, pod_name: "imported pod" })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.podDrawer}>
      <Toggle
        show={props.route !== "Overview" && props.route !== "Explore"}
        isLeft={isPrivate}
        setLeft={setIsPrivate}
      />
      <div className={classes.podInfoWrapper}>
        <PodInfo className={classes.podInfo} />
        <div className={classes.information}>
          {props.route === "Overview"
            ? "These below pods are automatically generated for your Owned Content (Home pod) and Shared Content (Shared Pod"
            : "Switch from Shared to Owned to see Home Pod"}
        </div>
      </div>
      <div className={classes.divider}></div>
      <button className={classes.podButton} onClick={handleOpen}>
        {isPrivate ? "Create Pod" : "Import Pod"}
      </button>
      {props.route === "Overview" ? (
        <div className={classes.pods}>
          {pods.map((pod) => {
            return (
              <div className={classes.podRow} onClick={() => setOverview(pod)}>
                <label>{pod}</label>
                <PodChevron className={classes.podChevron} />
              </div>
            );
          })}
        </div>
      ) : props.route !== "Explore" ? (
        <div className={classes.pods}>
          {state.pods.map((pod) => {
            return (
              <div className={classes.podRow} onClick={() => setPod(pod)}>
                <label>{pod}</label>
                <PodChevron className={classes.podChevron} />
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
      {/* <div className={classes.podInfoWrapper}>
        <PodInfo className={classes.podInfo} />
        <div className={classes.information}>
          Photos pod is an auto generated Pod that can be used with Fairphoto.
        </div>
      </div> */}
      {/* <Plus onClick={handleOpen} className={classes.Icon}></Plus> */}

      <Modal
        className={classes.modalContainer}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {isPrivate ? (
          <CreateNew
            handleClick={createNewPod}
            handleClose={handleClose}
            isRefLink={!isPrivate}
            setProp={setPodName}
            type="Pod"
          ></CreateNew>
        ) : (
          <CreateNew
            handleClick={importPod}
            handleClose={handleClose}
            isRefLink={!isPrivate}
            setProp={setPodRef}
            type="Pod"
          ></CreateNew>
        )}
      </Modal>
    </div>
  );
}

export default React.memo(PodSidebar);
