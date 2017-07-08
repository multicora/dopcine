import React from "react";
import TextField from "material-ui/TextField";
import makeMaterial from "helpers/MaterialHelper";

const input = ((props) => <TextField {...props} />);
const MaterialInput = makeMaterial(input);

const Login = props => {

  return (
    <div style={ props.styles }>
      <MaterialInput
        id="firstName"
        name="firstName"
        hintText="First name"
        floatingLabelText="First name"
        errorText={props.requestError || props.error}
        onChange={ props.onChange || (() => {}) }
        pattern={/^[a-zA-Z0-9]{2,}$/}
        required/>
      <MaterialInput
        id="lastName"
        name="lastName"
        hintText="Last Name"
        floatingLabelText="Last Name"
        errorText={props.error}
        onChange={ props.onChange || (() => {}) }
        pattern={/^[a-zA-Z0-9]{6,}$/}
        required/>
      <MaterialInput
        id="email"
        name="email"
        hintText="Email"
        floatingLabelText="Email"
        errorText={props.error}
        onChange={ props.onChange || (() => {}) }
        pattern={/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/}
        required/>
      <MaterialInput
        id="password"
        name="password"
        hintText="Password"
        floatingLabelText="Password"
        errorText={props.error}
        onChange={ props.onChange || (() => {}) }
        pattern={/^[a-zA-Z0-9]{6,}$/}
        required/>
      <MaterialInput
        id="confirmPassword"
        name="confirmPassword"
        hintText="Confirm password"
        floatingLabelText="Confirm password"
        errorText={props.error}
        onChange={ props.onChange || (() => {}) }
        pattern={/^[a-zA-Z0-9]{6,}$/}
        required/>
      </div>
  );
};

export default Login;