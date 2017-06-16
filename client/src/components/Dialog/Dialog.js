import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggle } from 'modules/dialog';
import { confirmEmail } from 'modules/auth';

class DialogComponent extends Component {

  componentDidUpdate() {
    let {actions} = this.props;
    typeof(actions[this.props.onOpen]) === "function" && actions[this.props.onOpen](this.props.onOpenProps);
  }

  render() {
    let { actions} = this.props;

    return (
      <div>
        <Dialog
          title={this.props.message || "Sign in"}
          modal={true}
          open={this.props.open}
          onRequestClose={actions.toggle}
        >
          <div>
            { this.props.hasLoader && <div>Loader
              <span> {this.props.loaderIcon} </span>
            </div>}
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({ 
  open: state.dialog.open,
  message: state.dialog.message,
  hasLoader: state.dialog.hasLoader,
  loaderIcon: state.dialog.loaderIcon,
  onOpen: state.dialog.onOpen,
  onOpenProps: state.dialog.onOpenProps
}); 

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
     toggle,
     confirmEmail
  }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogComponent);