import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

export default ({ component: Component, ...rest }) => {
  return(
  <Route {...rest} render={props =>
    <PrivateRoute component={Component} {...props} {...rest} />
  }/>
)};

let PrivateRoute = ({component: Component, isLogging, isUserLogged, ...rest}) => (
  isUserLogged || isLogging ? (
    <Component {...rest}/>
  ) : (
    <Redirect to={{
      pathname: '/login',
      state: { from: rest.location }
    }}/>
  )
);

const mapStateToProps = state => {
  const session = state.get("session");
  return ({
    isUserLogged: session.get("isUserLogged"),
    isLogging: session.get("isLogging")
  });
};

PrivateRoute = connect(
  mapStateToProps
)(PrivateRoute);

