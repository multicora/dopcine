import React from "react";
import { Link } from "react-router-dom";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import FontIcon from "material-ui/FontIcon";
import Divider from 'material-ui/Divider';
import pagesConfig from 'helpers/pagesConfig';

import styles from "./Sidebar.css";
import { connect } from "react-redux";

const dividerStyles = {
  marginLeft: "26px",
  marginRight: "26px",
  marginBottom: "30px",
  marginTop: "10px"
};

// import { bindActionCreators } from "redux";
// import {
//   selectors,
//   toggle
// } from "modules/layout";

class SideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  __handleToggle() {
    this.setState({open: !this.state.open});
  }

  __isDocked(pathname, breakpoint) {
    let result = false;
    if (pagesConfig[pathname] && pagesConfig[pathname].docked){
      result = !~(pagesConfig[pathname].docked.breakpoints || []).indexOf(breakpoint);
    }
    return result;
  }

  __getDockedWidth(pathname) {
    return pagesConfig[pathname] && pagesConfig[pathname].docked
      && pagesConfig[pathname].docked.width;
  }

  __getOpenState(pathname, isDocked) {
    return isDocked && (pagesConfig[pathname] && pagesConfig[pathname])
      ? pagesConfig[pathname].fixedSidebar || this.state.open
      : this.state.open;
  }

  render() {
    const { breakpoint, pathname } = this.props;
    const isDocked = this.__isDocked(pathname, breakpoint);
    const dockedWidth = this.__getDockedWidth(pathname) || 240;
    // TODO: move to func
    const isOpen = this.__getOpenState(pathname, isDocked);

    return (
      <div>
        <IconButton
          iconClassName="material-icons"
          onTouchTap={() => this.__handleToggle()}
        >
          menu
        </IconButton>
        <Drawer
          width={dockedWidth}
          docked={isDocked}
          open={isOpen}
          onRequestChange={(open) => this.setState({open})}
        >
          <div className={styles.menuItem}>
            <div className={styles.menuHeader}>DopCine</div>
          </div>
          <Divider style={dividerStyles}/>
          <MenuItem>
            <Link className={styles.menuItemContainer} to="/">
              <div className={styles.menuItem}>
                <FontIcon className={`material-icons ${styles.menuIcon}`}>dashboard</FontIcon>
                <div className={styles.menuText}>Dashboard</div>
              </div>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className={styles.menuItemContainer} to="/">
              <div className={styles.menuItem}>
                <FontIcon className={`material-icons ${styles.menuIcon}`}>backup</FontIcon>
                <div className={styles.menuText}>Uploads</div>
              </div>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className={styles.menuItemContainer} to="/">
              <div className={styles.menuItem}>
                <FontIcon className={`material-icons ${styles.menuIcon}`}>account_box</FontIcon>
                <div className={styles.menuText}>Profile</div>
              </div>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className={styles.menuItemContainer} to="/">
              <div className={styles.menuItem}>
                <FontIcon className={`material-icons ${styles.menuIcon}`}>web</FontIcon>
                <div className={styles.menuText}>Dopcine</div>
              </div>
            </Link>
          </MenuItem>
        </Drawer>
      </div>
    );
  }
};

const mapStateToProps = state => {
  const layout = state.get("layout");
  const routing = state.get("routing");
  return ({
    pathname: routing.location.pathname,
    breakpoint: layout.get("breakpoint")
  });
};

// const mapDispatchToProps = dispatch => bindActionCreators({
//   toggle
// }, dispatch);

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(SideBar);