import React from "react";
import Dialog from "material-ui/Dialog";
import AuthContainer from "./components/AuthContainer";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  selectors,
  toggle
} from "modules/auth";

const Auth = props => {
  console.log("Auth");
  return (
    <div>
      <Dialog
        title={props.requestMessage || "Sign in"}
        modal={false}
        open={props.open}
        onRequestClose={props.toggle.bind(null, {isOpen: false})}
      >
        <AuthContainer toggle={props.toggle}/>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => {
  const auth = state.get("auth");
  return ({
    open: selectors.getOpenState(state),
    requestMessage: auth.get("requestMessage")
  });
};

const mapDispatchToProps = dispatch => bindActionCreators({
  toggle
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);