import React from 'react';
import Dialog from 'material-ui/Dialog';
import AuthContainer from './components/AuthContainer';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  toggle
} from 'modules/auth';

const Auth = props => {

  return (
    <div>
      <Dialog
        title={props.requestMessage || "Sign in"}
        modal={false}
        open={props.open}
        onRequestClose={props.toggle}
      >
        <AuthContainer toggle={props.toggle}/>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => ({
  open: state.auth.open,
  requestMessage: state.auth.requestMessage
}); 

const mapDispatchToProps = dispatch => bindActionCreators({
  toggle
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);