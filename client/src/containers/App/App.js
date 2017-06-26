import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "containers/Home/Home";
import PageUpload from "containers/PageUpload/PageUpload";

const redirectActions = {
  "login": "openConfirmEmailDialog",
  "set-password": "setPasswordToken"
};

const getAction = (location = "") => {
  let matched = location.match(/^(?:\/)([0-9a-zA-Z-]+)(?:\/)/);
  return matched && redirectActions[matched[1]];
}

const getRedirect = (props) => {
  return (<Redirect to={{
    pathname: "/",
    token: props.match.params.token,
    ...(getAction(props.location.pathname) ? {action: getAction(props.location.pathname)} : {})
  }}/>);
};

export default () => (
  <div>
    <main>
      <Route path="/" render={(props) =>
        <Home {...props}>
          <Route path="/login/:token?" render={ getRedirect }/>
          <Route path="/set-password/:token?" render={ getRedirect }/>
          <Route path="/upload" component={ PageUpload }/>
        </Home>
      }/>
    </main>
  </div>
)