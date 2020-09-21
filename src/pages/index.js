import AccountCreateRoot from "./account-create/AccountCreateRoot";
import AccountRoot from "./account/AccountRoot";
import ConnectRoot from "./connect/ConnectRoot";
import DriveRoot from "./drive/DriveRoot";
import AccountUnlock from "./account-unlock/AccountUnlock";
import AccountLogin from "./account-login/AccountLogin";
import FileReceive from "./file-receive/FileReceiveRoot";

export default [
  {
    path: "/account-create/:fwdUrl?",
    component: AccountCreateRoot
  }, {
    path: "/account",
    exact: true,
    component: AccountRoot
  }, {
    path: "/connect/:id",
    component: ConnectRoot
  }, {
    path: "/drive/:path",
    component: DriveRoot
  }, {
    path: "/unlock/:fwdUrl?",
    component: AccountUnlock
  }, {
    path: "/login",
    exact: true,
    component: AccountLogin
  }, {
    path: "/receive/:shareId",
    component: FileReceive
  }
];
