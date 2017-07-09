import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import FontIcon from "material-ui/FontIcon";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Basket from "containers/Basket/Basket";
import Sidebar from "components/Sidebar/Sidebar";

import { toggle, logout } from "modules/auth";
import { verifyUser, selectors } from "modules/session";

import styles from "./Header.css";

const iconElementRight = ({userProfile, actions: {toggle, logout}}) => {
  const label = userProfile
    ? `${userProfile.get("firstName")} ${userProfile.get("lastName")}`
    : "";

  const userMenu = ([
    <IconMenu
      key={1}
      iconButtonElement={<IconButton iconClassName="material-icons">account_circle</IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'center'}}
      targetOrigin={{horizontal: 'left', vertical: 'center'}}
    >
      <MenuItem
        primaryText={label}
        disabled />
      <MenuItem
        onTouchTap={logout}
        primaryText="Log Out" />
    </IconMenu>,
    <Basket key={2}/>
  ]);

  return (<div className={styles.rightActions}>
    <Link to={"/upload"}>
      <FlatButton
        label="Sell Footage"
        icon={<FontIcon className="material-icons">file_upload</FontIcon>}
      />
    </Link>
    {userProfile
      ? (userMenu)
      : (<FlatButton label={"Sign In"} onTouchTap={toggle} />)
    }
  </div>);
};

const iconElementLeft = () => {
  return (<Sidebar />);
};

const Header = (props) => (
  <div>
    <AppBar
      className={styles.header}
      title="Title"
      iconElementLeft={ iconElementLeft(props) }
      iconElementRight={ iconElementRight(props) }/>
  </div>
);


const mapStateToProps = state => {
  const sessionStore = state.get("session");
  const layout = state.get("layout");
  return ({
    isUserLogged: sessionStore.get("isUserLogged"),
    userProfile: selectors.getUserProfileState(state),
    breakpoint: layout.get("breakpoint")
  })
};

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({
    toggle,
    logout,
    verifyUser,
  }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);