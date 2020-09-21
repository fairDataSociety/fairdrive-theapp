import {takeEvery} from "redux-saga/effects";
import * as t from "./actionTypes";
// Sagas
import getDriveContentSaga from "./sagas/getDriveContentSaga";
import uploadFilesSaga from "./sagas/uploadFilesSaga";

/******************************* Watchers *************************************/

export default function* driveRootSaga() {
  //yield systemSaga()
  yield takeEvery(t.GET_DRIVE, getDriveContentSaga);
  yield takeEvery(t.UPLOAD_FILES, uploadFilesSaga);
}
