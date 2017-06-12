import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import AuthContainer from './components/AuthContainer';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  toggle,
} from '../../modules/auth';

const Auth = props => {

  return (
    <div>
      <RaisedButton label="Sign In" onTouchTap={props.toggle} />
      <Dialog
        title="Sign in"
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
  open: state.auth.open
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggle
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);