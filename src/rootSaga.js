import { all } from "redux-saga/effects";
import services from "./services";

export default function* rootSaga() {
  yield all([
    ...Object.values(services)
      .filter(service => service.saga)
      .map(service => service.saga())
  ]);
}
