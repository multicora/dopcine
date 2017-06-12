import React, {Component} from 'react';
const PropTypes = require('prop-types');

class Form extends Component {

  static childContextTypes = {
    onFormChange: PropTypes.func,
  }

  getChildContext() {
    return {
      onFormChange: this.__onFormChange.bind(this)
    }
  }

  __onFormChange(form) {
    typeof(this.props.onFormChange) == "function" && this.props.onFormChange({
      ...form,
      formName: this.props.name
    });
  }

  render() {
    return (<div>{ this.props.children }</div>)
  }
}

export default Form