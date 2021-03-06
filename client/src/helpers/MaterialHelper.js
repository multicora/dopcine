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
        value: props.value ? props.value : props.defaultValue || "",
        isDirty: props.isDirty || false
      };
    }

    componentWillMount() {
      typeof(this.context.onFormChange) === "function"
        && this.context.onFormChange({
          name: this.props.name,
          isValid: !this.__getFormError(this.props, this.state.value),
          isDirty: false,
          ...(!!this.state.value
                ? {value: this.state.value}
                : this.props.defaultValue
                  ? {value: this.props.defaultValue}
                  : {}
              )
        });
    }

    componentWillUpdate(nextProps, nextState) {
      typeof(this.context.onFormChange) === "function"
        && this.context.onFormChange({
          name: this.props.name,
          isValid: !this.__getFormError(this.props, nextState.value),
          isDirty: nextState.isDirty,
          ...(!!nextState.value ? {value: nextState.value} : {})
        });
    }

    componentWillReceiveProps(nextProps, nextState) {
      if ((!!this.state.isDirty !== !!nextProps.isDirty && nextProps.isDirty !== undefined)
        || (this.state.value !== nextProps.value && nextProps.value !== undefined)) {
        this.setState({
          isDirty: nextProps.isDirty,
          value: nextProps.value
            ? nextProps.value
            : this.props.defaultValue
              ? this.props.defaultValue
              : ""
        });
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return nextProps.errorText !== this.props.errorText
        || nextState.isDirty !== this.state.isDirty
        || nextState.value !== this.state.value
        || nextProps.value !== this.state.value;
    }

    componentWillUnmount() {
      typeof(this.context.onFormUnmount) === "function"
        && this.context.onFormUnmount({ name: this.props.name });
    }

    __onChange(e, index, value) {
      // treat as select if value is present, as input otherwise
      const newValue = value || e.target.value;

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

      let props = Object.assign({}, this.props);
      delete props.isDirty;

      return <WrappedComponent
        {...props}
        value={value}
        onChange={ this.__onChange.bind(this) }
        errorText={ isDirty && (errorText || error) }
      />;
    }
  }
}

export default makeMaterial;