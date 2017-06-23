import React from "react";
import TextField from "material-ui/TextField";
import makeMaterial from "helpers/MaterialHelper";

const input = ((props) => <TextField {...props} />)
const MaterialInput = makeMaterial(input)

const SetPass = props => {

  return (
    <div style={ props.styles }>
      <MaterialInput
        id="password"
        name="password"
        hintText="Password"
        floatingLabelText="Password"
        errorText={props.requestError || props.error}
        value={props.password || ""}
        onChange={ props.onChange || (() => {}) }
        pattern={/^[a-zA-Z0-9]{6,}$/}
        required/>
      <MaterialInput
        id="confirmPassword"
        name="confirmPassword"
        hintText="confirmPassword"
        floatingLabelText="confirmPassword"
        errorText={props.error}
        value={props.confirmPassword || ""}
        onChange={ props.onChange || (() => {}) }
        pattern={/^[a-zA-Z0-9]{6,}$/}
        required/>
      </div>
  );
};

export default SetPass;