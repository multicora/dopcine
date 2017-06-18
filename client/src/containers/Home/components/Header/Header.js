import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import styles from './Header.css';

const iconElementRight = (props) =>
  (<div>
    <RaisedButton label="Sign In" onTouchTap={props.toggle} />
    <FlatButton label="Save" />
  </div>);

const Header = (props) => (
  <div>
    <AppBar
      className={styles.header}
      title="Title"
      iconElementRight={ iconElementRight(props) }/>
  </div>
);

export default Header;