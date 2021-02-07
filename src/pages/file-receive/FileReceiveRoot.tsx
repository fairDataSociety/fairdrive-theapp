import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import FileReceiveAccept from "./pages/FileReceiveAccept";

import { receiveFileInfo, receiveFile } from "../../helpers/apiCalls";
const fileReceiveAcceptId = "fileReceiveAcceptId";
const waitingId = "waitingId";

function getAccount(state: any) {
  return state.account;
}

function FileReceiveRoot() {
  const params: any = useParams();
  const account = useSelector((state) => getAccount(state));
  console.log(account);
  const [shareId, setShareId] = useState("");
  const [stage, setStage] = useState("waitingId");
  const [fileStat, setFileStat] = useState();

  async function retrieveInfo() {
    const res = await receiveFileInfo(params.shareId);
    setShareId(params.shareId);
    console.log(res);
    setFileStat(res);
    setStage(fileReceiveAcceptId);
  }

  useEffect(() => {
    retrieveInfo();
  }, [account.locked]);

  console.log(shareId);

  switch (stage) {
    case waitingId:
      return <div>Waiting</div>;
      break;
    case fileReceiveAcceptId:
      return (
        <FileReceiveAccept
          account={account}
          fileStat={fileStat}
          shareId={shareId}
        ></FileReceiveAccept>
      );
      break;
    default:
      break;
  }
}
export default FileReceiveRoot;
