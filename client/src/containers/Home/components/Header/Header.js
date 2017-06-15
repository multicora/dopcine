import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const iconElementRight = (props) =>
  (<div>
    <RaisedButton label="Sign In" onTouchTap={props.toggle} />
    <FlatButton label="Save" />
  </div>);

const Header = (props) => (
  <div>
    <AppBar
      title="Title"
      iconElementRight={ iconElementRight(props) }/>
  </div>
);

export default Header;