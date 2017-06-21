import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "containers/Home/Home";

const redirectActions = [
  "login": "confirmPassword",
  "set-password": "setPassword"
];

const getAction = (location = "") => {
  let matched = location.match(/^(?:\/)([0-9a-zA-Z]+)(?:\/)/);
  return matched && redirectActions[matched[1]];
}

export default () => (
  <div>
    <main>
      <Route path="/" render={(props) =>
        <Home {...props}>
          <Route path="/login/:token?" render={(props) => {
            return (<Redirect to={{
              pathname: "/",
              token: props.match.params.token,
              ...(getAction(props.location.pathname) ? {action: getAction(props.location.pathname)} : {})
            }}/>)
          }}/>
        </Home>
      }/>
    </main>
  </div>
)