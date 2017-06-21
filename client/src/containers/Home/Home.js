import React, {Component} from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { loadItem } from "helpers/localStorage";
import Auth from "containers/Auth/Auth";
import Dialog from "components/Dialog/Dialog";
import Header from "./components/Header/Header";

import { toggle } from "modules/auth";
import { verifyUser, selectors } from "modules/session";
import { toggle as toggleDialog } from "modules/dialog";

class Home extends Component {

  componentDidMount() {
    const token = loadItem("token");
    token && typeof(this.props.actions.verifyUser) === "function"
      && this.props.actions.verifyUser({token});
  }

  componentWillReceiveProps(nextProps) {
    let {actions, location: {token, action}} = nextProps;
    if (token) {
      actions.toggleDialog({
        message: "Confirming email...",
        loaderIcon: "action.loaderIcon",
        onOpen: "confirmEmail",
        onOpenProps: {token}
      });
    }
  }

  render() {
    let {actions, children, userProfile} = this.props;
    return (
      <div>
        <Header userProfile={userProfile} toggle={actions.toggle}/>
        <Auth />
        <Dialog />
        {children}
      </div>
    );
  }
};

const mapStateToProps = state => {
  return ({
    userProfile: selectors.getUserProfileState(state)
  })
};

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({
    toggle,
    toggleDialog,
    verifyUser
  }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);