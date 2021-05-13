import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { StoreContext } from "../../store/store";
export interface Props {
  path: string;
  children: React.ReactElement<any>;
}
function AuthRoute(props: Props) {
  const { state, actions } = useContext(StoreContext);
  if (state.password) return <Redirect to="/drive/root" />;

  return <Route {...props} />;
}

export default React.memo(AuthRoute);
