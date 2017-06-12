import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Auth from 'containers/Auth/Auth.js'

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const buttonStyle = {
  backgroundColor: 'transparent',
  color: 'white'
};

const iconElementRight = (
  <div>
    <Auth />
    <FlatButton label="Save" />
  </div>
);

const Header = () => (
  <div>
    <AppBar
      title="Title"
      iconElementRight={ iconElementRight }
    >
    </AppBar>
  </div>
);

export default Header;