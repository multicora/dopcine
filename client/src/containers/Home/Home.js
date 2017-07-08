import React, {Component} from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { loadItem } from "helpers/localStorage";
import Auth from "containers/Auth/Auth";
import Dialog from "components/Dialog/Dialog";
import Header from "./components/Header/Header";

import { toggle } from "modules/auth";
import { verifyUser, selectors } from "modules/session";

class Home extends Component {

  componentDidMount() {
    // veryfy user using token form localStorage
    const {actions} = this.props;
    const sessionToken = loadItem("token");
    sessionToken && typeof(actions.verifyUser) === "function"
      && actions.verifyUser({token: sessionToken});
  }

  componentDidUpdate() {
    // trigger actins on redirect with token
    const {actions, location: {token, action}} = this.props;
    if (token) {
      typeof(actions[action]) === "function" && actions[action]({token});
    }
  }

  render() {
    let {actions, children, userProfile} = this.props;
    return (
      <div>
        <Header userProfile={userProfile} actions={actions}/>
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
    verifyUser,
    push: (route) => push(route)
  }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);