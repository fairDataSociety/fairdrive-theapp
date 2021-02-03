import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

// Sub-pages
import AccountHome from "./pages/AccountHome";
import MyIdentity from "./pages/MyIdentity";
import RemoveAccount from "./pages/RemoveAccount";
import ChooseAvatar from "../account-create/pages/ChooseAvatar";
import ShortCode from "./pages/ShortCode";
import ResolveShort from "./pages/ResolveShort";

// Api
import {getAvatar, storeAvatar, logOut} from "helpers/apiCalls";

// Ids
const accountHome = "accountHome";
const myIdentity = "myIdentity";
const removeAccount = "removeAccount";
const avatarStage = "avatarStage";
const shortcodeStage = "shortcodeStage";
const resolveShort = "resolveShort";

function getAccount(state) {
  return state.account;
}

export function AccountRoot() {
  const [stage, setStage] = useState(myIdentity);
  const account = useSelector(state => getAccount(state));

  const dispatch = useDispatch();
  const history = useHistory();

  const setUsername = username => dispatch({
    type: "SET_ACCOUNT",
    data: {
      username: username
    }
  });

  async function setAvatar(avatar) {
    await storeAvatar(avatar);
    const resAvatar = await getAvatar(account.username);
    //console.log(avatar);
    dispatch({
      type: "SET_ACCOUNT",
      data: {
        avatar: resAvatar
      }
    });
  }

  const removeAccountDef = () => {
    dispatch({type: "RESET_ACCOUNT"});
    history.push("/");
  };

  async function handleLogout() {
    await logOut(account.username);
    dispatch({
      type: "SET_SYSTEM",
      data: {
        unlocked: false,
        passWord: ""
      }
    });
    history.push("/unlock");
  }

  const handleShortcode = () => {
    dispatch({
      type: "CREATE_SHORTCODE",
      data: {
        username: account.username,
        useravatar: account.avatar
      }
    });
    setStage(shortcodeStage);
  };

  const newShort = () => {
    dispatch({type: "CREATE_SHORTCODE", data: ""});
  };

  const handleResolveShortcode = shortcode => {
    console.log(shortcode);
    dispatch({type: "RESOLVE_SHORTCODE", data: shortcode});
  };

  function handleExit() {
    console.log("exit");
    history.push("/drive/root");
  }

  // Router
  switch (stage) {
    case accountHome:
      return (<AccountHome myIdentityStage={() => setStage(myIdentity)} shortCodeStage={() => setStage(shortcodeStage)} resolveStage={() => setStage(resolveShort)}></AccountHome>);
    case myIdentity:
      return (<MyIdentity avatar={account.avatar} avatarStage={() => setStage(avatarStage)} username={account.username} setUsername={setUsername} setAvatar={setAvatar} publicKey={account.publicKey} address={account.address} nextStage={() => setStage(removeAccount)} exitStage={() => handleExit()} shortCode={handleShortcode} resolveShort={() => setStage(resolveShort)} logOut={() => handleLogout()}/>);
    case removeAccount:
      return (<RemoveAccount nextStage={() => setStage(myIdentity)} removeAccount={removeAccountDef}></RemoveAccount>);
    case avatarStage:
      return (<ChooseAvatar setAvatar={setAvatar} avatar={account.avatar} exitStage={() => setStage(myIdentity)}></ChooseAvatar>);
    case shortcodeStage:
      return (<ShortCode shortcode={account.shortcode} nextStage={() => setStage()} exitStage={() => setStage()} newShort={newShort}></ShortCode>);

    case resolveShort:
      return (<ResolveShort nextStage={() => setStage()} exitStage={() => setStage()} resolveShortcode={handleResolveShortcode} peerAvatar={account.peerAvatar} peerUsername={account.peerUsername} peerAddress={account.peerAddress}></ResolveShort>);

    default:
      return <h1>Oops...</h1>;
  }
}

export default AccountRoot;
