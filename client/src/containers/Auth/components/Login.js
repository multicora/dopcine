import React from "react";
import TextField from "material-ui/TextField";
import makeMaterial from "helpers/MaterialHelper";

const input = ((props) => <TextField {...props} />)
const MaterialInput = makeMaterial(input)

const Login = props => {

  return (
    <div style={ props.styles }>
      <div style={ props.styles }>
        <MaterialInput
          id="email"
          name="email"
          hintText="Email"
          floatingLabelText="Email"
          errorText={props.requestError || props.error}
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
        </div>
        <div onTouchTap={props.onForgotClick} style={{
          "color": "red",
          "textDecoration": "underline",
          "marginTop": "20px",
          "marginLeft": "-125px",
          "cursor": "pointer"
        }}> Forgot Password? </div>
      </div>
  );
};

export default Login;