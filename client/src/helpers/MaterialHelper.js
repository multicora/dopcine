import React, {Component} from 'react';
const PropTypes = require('prop-types');

const ERRORS = {
  required: "This field is required",
  pattern: "This field should match pattern",
};

function makeMaterial(WrappedComponent) {
  return class MaterialInput extends Component {

    static contextTypes  = {
      onFormChange: PropTypes.func
    };

    static defaultProps = {
      value: ""
    }

    constructor(props) {
      super(props);

      this.state = {};
    }

    componentWillMount() {
      typeof(this.context.onFormChange) == "function"
        && this.context.onFormChange({ name: this.props.name, isValid: !this.__getFormError(this.props) });
    }

    shouldComponentUpdate(nextProps, nextState) {
      return nextProps.error != this.props.error
        || nextState.value != this.state.value;
    }

    componentWillUnmount() {
      typeof(this.context.onFormUnmount) == "function"
        && this.context.onFormUnmount({ name: this.props.name });
    }

    __onChange(e) {
      let target = e.target;
      let error = this.__getFormError(e.target);

      typeof(this.context.onFormChange) == "function"
        && this.context.onFormChange({ name: target.name, isValid: !error, value: target.value });
      this.setState({ error: error, value: target.value });
    }

    __getFormError(props) {
      let validations = {
        required: !props.required || props.required && !!props.value,
        pattern: !props.pattern || !!props.pattern && (new RegExp(props.pattern)).test(props.value)
      };

      return ERRORS[Object.keys(validations).filter(rule => !validations[rule])[0]];
    }

    render() {
      let { error, value } = this.state;

      return <WrappedComponent
        {...this.props}
        value={value}
        onChange={ this.__onChange.bind(this) }
        errorText={ error }
      />;
    }
  }
}

export default makeMaterial