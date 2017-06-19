import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import styles from './Header.css';

const iconElementRight = (props) => {
  const label = props.userProfile
    ? `${props.userProfile.firstName} ${props.userProfile.lastName}`
    : "Sign In";
  return (<div>
    <RaisedButton label={label} onTouchTap={!label ? props.toggle : ()=> {}} />
    <FlatButton label="Save" />
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