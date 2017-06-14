import React from 'react';
import TextField from 'material-ui/TextField';
import makeMaterial from 'helpers/MaterialHelper';

const input = ((props) => <TextField {...props} />)
const MaterialInput = makeMaterial(input)

const Login = props => {

  return (
    <div style={ props.styles }>
      <MaterialInput
        id="email"
        name="email"
        hintText="Email"
        floatingLabelText="Email"
        errorText={props.requestError || props.error}
        value={props.email || ""}
        onChange={ props.onChange || (() => {}) }
        pattern={/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/}
        required/>
      <MaterialInput
        id="password"
        name="password"
        hintText="Password"
        floatingLabelText="Password"
        errorText={props.error}
        value={props.password || ""}
        onChange={ props.onChange || (() => {}) }
        pattern={/^[a-zA-Z0-9]{6,}$/}
        required/>
      </div>
  );
}

export default Login