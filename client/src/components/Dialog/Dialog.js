import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog';

import { toggle } from 'modules/dialog';
import { confirmEmail } from 'modules/auth';

class DialogComponent extends Component {

  componentDidUpdate() {
    let {actions} = this.props;
    typeof(actions[this.props.onOpen]) === "function" && actions[this.props.onOpen](this.props.onOpenProps.toJS());
  }

  render() {
    let { actions} = this.props;
  console.log("Dialog")

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

const mapStateToProps = state => {
  const dialog = state.get("dialog");
  return({
    open: dialog.get("open"),
    message: dialog.get("message"),
    hasLoader: dialog.get("hasLoader"),
    loaderIcon: dialog.get("loaderIcon"),
    onOpen: dialog.get("onOpen"),
    onOpenProps: dialog.get("onOpenProps")
  })
};

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