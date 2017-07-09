import { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { loadItem } from "helpers/localStorage";
import { toggle, openConfirmEmailDialog, setPasswordToken } from "modules/auth";
import { verifyUser, selectors } from "modules/session";

class AuthHandler extends Component {

  componentWillMount() {
    const { actions } = this.props;
    const sessionToken = loadItem("token");

    // veryfy user using token form localStorage
    sessionToken && typeof(actions.verifyUser) === "function"
      && actions.verifyUser({token: sessionToken});
  }

  componentDidUpdate() {
    const { actions, location: {token, action, from: redirect}, isUserLogged } = this.props;

    // trigger actins on redirect with token
    if ((token || action) && !isUserLogged) {
      typeof(actions[action]) === "function" && actions[action]({token});
      return;
    } else if (isUserLogged && !this.props.userProfile) {
      const sessionToken = loadItem("token");
      sessionToken && typeof(actions.verifyUser) === "function"
        && actions.verifyUser({token: sessionToken})
    } else if ( isUserLogged && redirect) {
      actions.push(redirect);
    }
  }

  render() {
    return (null);
  }
};

const mapStateToProps = state => {
  const sessionStore = state.get("session");
  return ({
    isUserLogged: sessionStore.get("isUserLogged"),
    userProfile: selectors.getUserProfileState(state)
  })
};

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({
    verifyUser,
    openConfirmEmailDialog,
    setPasswordToken,
    toggle,
    push: (route) => push(route)
  }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthHandler);