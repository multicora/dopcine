import React, {Component} from "react";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import {Tabs, Tab} from "material-ui/Tabs";
import Form from "components/Form/Form";
import Login from "./Login";
import Register from "./Register";
import SetPassword from "./SetPassword";
import ResetPassword from "./ResetPassword";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  selectTab,
  register,
  login,
  setPassword,
  resetPassword,
  confirmEmail
} from "modules/auth";

const containerStyles = {
  "display": "flex",
  "flexDirection": "column",
  "alignItems": "center"
};

const actionStyles = {
  "display": "flex",
  "justifyContent": "flex-end"
};

class AuthContainer extends Component {
  __forms = {};

  constructor(props) {
    super(props);

    this.state = {
      isFormValid: false
    };
  }

  componentWillReceiveProps(nextProps) {
    let isNewFormValid = this.__isFormValid(this.__forms[nextProps.selectedTab]);
    nextProps.selectedTab !== this.props.selectedTab && isNewFormValid !== this.state.isFormValid
      && this.setState({isFormValid: isNewFormValid});
  }

  __onFormChange(form) {
    !this.__forms[form.formName]
      && (this.__forms[form.formName] = {name: form.formName, fields: {}, isFormValid: false});
    this.__forms[form.formName].fields[form.name] = form;

    let isFormValid = this.__isFormValid(this.__forms[this.props.selectedTab]);
    isFormValid !== this.state.isFormValid &&  this.setState({isFormValid});
  }

  __isFormValid(form) {
    return form
      && !Object.keys(form.fields).some((field) => !form.fields[field].isValid);
  }

  __onFormSubmit() {
    let props = Object.assign({}, (this.props.setPasswordToken ? {token: this.props.setPasswordToken} : {}));
    let selectedTab = this.props.selectedTab;
    let formFieds = this.__forms[selectedTab].fields;

    Object.keys(formFieds).forEach((field) =>
      props[field] = formFieds[field].value
    ); 
    typeof(this.props[selectedTab]) === "function" && this.props[selectedTab](props);
  }

  render() {
    console.log("AuthContainer");

    let {toggle, selectTab, selectedTab, requestInProgress, requestError} = this.props;
    let {isFormValid} = this.state;

    let registerLoginTabs = (<div>
      <div className={"loadingOverlay"} />
      <Tabs
        value={selectedTab}
        onChange={selectTab}
      >
        <Tab label="Login" value="login">
          { selectedTab === "login" && <Form name="login" onFormChange={this.__onFormChange.bind(this)}>
            <Login onForgotClick={selectTab.bind(null, "resetPassword")} requestError={requestError} styles={ containerStyles }/>
          </Form> }
        </Tab>
        <Tab label="Register" value="register">
          { selectedTab === "register" && <Form name="register" onFormChange={this.__onFormChange.bind(this)}>
            <Register requestError={requestError} styles={ containerStyles }/>
          </Form> }
        </Tab>
      </Tabs>
    </div>);

    const actions = (<div style={ actionStyles }>
      <FlatButton
        key={0}
        label="Cancel"
        default={true}
        onTouchTap={toggle.bind(null, {isOpen: false})}
      />
      <RaisedButton
        label="Submit"
        primary={true}
        disabled={!isFormValid || requestInProgress}
        keyboardFocused={true}
        onTouchTap={this.__onFormSubmit.bind(this)}
      />
    </div>);

    let resetSetPassBlock = (<div>
      { selectedTab === "resetPassword" && <Form name="resetPassword" onFormChange={this.__onFormChange.bind(this)}>
        <ResetPassword requestError={requestError} styles={ containerStyles }/>
      </Form> }
      { selectedTab === "setPassword" && <Form name="setPassword" onFormChange={this.__onFormChange.bind(this)}>
        <SetPassword requestError={requestError} styles={ containerStyles }/>
      </Form> }
    </div>);

    return (<div>
      { ~(["login", "register"]).indexOf(selectedTab) ? registerLoginTabs : resetSetPassBlock }
      { actions }
    </div>);
  }
};

const mapStateToProps = state => {
  const auth = state.get("auth");
  return ({
    selectedTab: auth.get("selectedTab"),
    requestInProgress: auth.get("requestInProgress"),
    requestError: auth.get("requestError"),
    setPasswordToken: auth.get("setPasswordToken")
  });
};

const mapDispatchToProps = dispatch => bindActionCreators({
  selectTab,
  register,
  login,
  setPassword,
  resetPassword,
  confirmEmail
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthContainer);

