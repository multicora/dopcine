import React from "react";
import { Route, Redirect } from "react-router-dom";
import PrivateRoute from "helpers/PrivateRoute";
import Home from "containers/Home/Home";
import PageUpload from "containers/PageUpload/PageUpload";

const redirectActions = {
  "loginWithToken": "openConfirmEmailDialog",
  "set-password": "setPasswordToken",
  "login": "toggle"
};

const getAction = (location = "", hasToken) => {
  let matched = location.match(/^(?:\/)([0-9a-zA-Z-]+)(?:\/?)/);
  return matched && redirectActions[`${matched[1]}${hasToken ? "WithToken" : ""}`];
};

const getRedirect = (props) => {
  return (<Redirect to={{
    pathname: "/",
    token: props.match.params.token,
    ...(getAction(props.location.pathname)
        ? {action: getAction(props.location.pathname, !!props.match.params.token)}
        : {}
    )
  }}/>);
};

export default () => (
  <div>
    <main>
      <Route path="/" render={(props) =>
        <Home {...props}>
          <Route path="/login/:token?" render={ getRedirect }/>
          <Route path="/set-password/:token?" render={ getRedirect }/>
          <PrivateRoute path="/upload" component={ PageUpload }/>
        </Home>
      }/>
    </main>
  </div>
)