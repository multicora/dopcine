import React from "react";

import { connect } from "react-redux";
import breakpointHelper from "helpers/breakpointHelper";

import { bindActionCreators } from "redux";
import {
  setBreakpoint
} from "modules/layout";
// 
const addEvent = (object, type, callback) => {
    if (object === null || typeof(object) === "undefined") return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, true);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

const removeEvent = (object, type, callback) => {
    if (object === null || typeof(object) === "undefined") return;
    if (object.addEventListener) {
        object.removeEventListener(type, callback);
    } else if (object.attachEvent) {
        object.detachEvent ("on" + type, callback);
    } else {
        object["on"+type] = null;
    }
};

class ResizeTracker extends React.Component {

  constructor(props) {
    super(props);

    this.__onResize = this.__onResize.bind(this);
    this.__setBreakpoint = this.__setBreakpoint.bind(this);
  }

  componentWillMount() {
    if (typeof(window) !== "undefined") {
      this.__setBreakpoint(breakpointHelper(window.innerWidth))
      addEvent(window, "resize", this.__onResize);
    }
  }

  componentWillUnmount() {
    typeof(window) !== "undefined" && removeEvent(window, "resize", this.__onResize);
  }

  __onResize(e) {
    this.__setBreakpoint(breakpointHelper(e.target.innerWidth))
  }

  __setBreakpoint(breakpoint) {
    typeof(this.props.setBreakpoint) !== "undefined"
      && this.props.setBreakpoint({breakpoint})
  }

  render() {
    return (null);
  }
};

// const mapStateToProps = state => {
//   const layout = state.get("layout");
//   return ({
//     breakpoint: layout.get("breakpoint")
//   });
// };

const mapDispatchToProps = dispatch => bindActionCreators({
  setBreakpoint
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(ResizeTracker);