import React, {Component} from "react";
const PropTypes = require("prop-types");

const ERRORS = {
  required: "This field is required",
  pattern: "This field should match pattern",
};

function makeMaterial(WrappedComponent) {
  return class MaterialInput extends Component {

    static contextTypes  = {
      onFormChange: PropTypes.func
    };

    constructor(props, context) {
      super(props);

      this.state = {
        value: props.value || "",
        isDirty: props.isDirty || false
      };
      typeof(context.onFormChange) === "function"
        && context.onFormChange({
          name: props.name,
          isValid: !this.__getFormError(props, this.state.value),
          isDirty: false,
          ...(!!this.state.value ? {value: this.state.value} : {})
        });
    }

    componentDidUpdate() {
      typeof(this.context.onFormChange) === "function"
        && this.context.onFormChange({
          name: this.props.name,
          isValid: !this.__getFormError(this.props, this.state.value),
          isDirty: this.state.isDirty,
          ...(!!this.state.value ? {value: this.state.value} : {})
        });
    }

    componentWillReceiveProps(nextProps, nextState) {
      if ((!!this.state.isDirty !== !!nextProps.isDirty && nextProps.isDirty !== undefined)
        || (this.state.value !== nextProps.value && nextProps.value !== undefined)) {
        this.setState({
          isDirty: nextProps.isDirty,
          value: nextProps.value || ""
        });
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return nextProps.errorText !== this.props.errorText
        || nextState.isDirty !== this.state.isDirty
        || nextState.value !== this.state.value;
    }

    componentWillUnmount() {
      typeof(this.context.onFormUnmount) === "function"
        && this.context.onFormUnmount({ name: this.props.name });
    }

    __onChange(e, index, value) {
      // treat as selsct if value is present, as input otherwise
      const target = e.target;
      const newValue = value || e.target.value;
      const error = this.__getFormError(this.props, newValue);

      typeof(this.context.onFormChange) === "function"
        && this.context.onFormChange({
          name: target.name || this.props.name,
          isValid: !error,
          value: newValue,
          isDirty: true });
      this.setState({ value: newValue, isDirty: true });
    }

    __getFormError(props, value) {
      const validations = {
        required: !props.required || (props.required && !!value),
        pattern: !props.pattern || (!!props.pattern && (props.pattern).test(value))
      };

      return ERRORS[Object.keys(validations).filter(rule => !validations[rule])[0]];
    }

    render() {
      const { value, isDirty } = this.state;
      const { errorText} = this.props;

      const error = this.__getFormError(this.props, value);

      return <WrappedComponent
        {...this.props}
        value={value}
        onChange={ this.__onChange.bind(this) }
        errorText={ isDirty && (errorText || error) }
      />;
    }
  }
}

export default makeMaterial;