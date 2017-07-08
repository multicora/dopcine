import React from "react";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import FontIcon from "material-ui/FontIcon";
import Basket from "containers/Basket/Basket";

import styles from "./Header.css";

const iconElementRight = ({userProfile, actions: {toggle, push}}) => {
  // const label = props.userProfile
  //   ? `${props.userProfile.firstName} ${props.userProfile.lastName}`
  //   : "Sign In";
  return (<div className={styles.rightActions}>
    <FlatButton
      onTouchTap={() => {push("/upload")}}
      label="Sell Footage"
      icon={<FontIcon className="material-icons">file_upload</FontIcon>}
    />
    {userProfile
      ? (<IconButton iconClassName="material-icons" onTouchTap={() => {}}>account_circle</IconButton>)
      : (<RaisedButton label={"Sign In"} onTouchTap={!userProfile ? toggle : (()=> {})} />)
    }
    <Basket />
  </div>);
};

const Header = (props) => (
  <div>
    <AppBar
      className={styles.header}
      title="Title"
      iconElementRight={ iconElementRight(props) }/>
  </div>
);

export default Header;