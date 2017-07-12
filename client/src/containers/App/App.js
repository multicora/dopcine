import React from "react";
import { Route, Redirect } from "react-router-dom";
import PrivateRoute from "helpers/PrivateRoute";
import AuthHandler from "helpers/AuthHandler";
import ResizeTracker from "helpers/ResizeTracker";
import Layout from "containers/Layout/Layout";
import PageUpload from "containers/PageUpload/PageUpload";
import Auth from "containers/Auth/Auth";
import Dialog from "components/Dialog/Dialog";
import Header from "./components/Header/Header";

const redirectActions = {
  "loginWithToken": "openConfirmEmailDialog",
  "set-passwordWithToken": "setPasswordToken",
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
    ...(getAction(props.location.pathname, !!props.match.params.token)
        ? {action: getAction(props.location.pathname, !!props.match.params.token)}
        : {}
    ),
    ...(props.location.state ? {from: props.location.state.from} : {})
  }}/>);
};

export default () => (
  <div>
    <main>
      <ResizeTracker />
      <Header/>
      <Auth />
      <Dialog />
      <Route path="/" render={(props) =>
        <div>
          <AuthHandler {...props}/>
          <Layout location={props.location}>
            <Route path="/login/:token?"  render={ getRedirect }/>
            <Route path="/set-password/:token?" render={ getRedirect }/>
            <PrivateRoute path="/upload" component={ PageUpload }/>
          </Layout>
        </div>
      }/>
    </main>
  </div>
)