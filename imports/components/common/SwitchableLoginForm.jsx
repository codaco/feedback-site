import React from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';

const LOGIN_MODE = "login";
const SIGNUP_MODE = "signup";

class SwitchableLoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: LOGIN_MODE,
    };

    this.doToggle = this.doToggle.bind(this);
  }


  doToggle() {
    this.setState(({ mode }) => {
      if (mode === LOGIN_MODE) {
        return { mode: SIGNUP_MODE };
      }

      return { mode: LOGIN_MODE };
    });
  }

  switchToLoginButton() {
    return {
      id: 'switchToLogin',
      label: 'Log in',
      type: 'link',
      onClick: this.doToggle
    }
  }

  switchToSignupButton() {
    return {
      id: 'switchToSignup',
      label: 'Create new account',
      type: 'link',
      onClick: this.doToggle
    }
  }

  render() {
    if (this.state.mode === LOGIN_MODE) {
      return (
        <Components.SimpleLoginForm onComplete={this.props.onComplete} otherButtons={[this.switchToSignupButton()]} />
      );
    }

    return (
      <Components.SimpleSignupForm onComplete={this.props.onComplete} otherButtons={[this.switchToLoginButton()]} />
    );
  }

}

SwitchableLoginForm.propTypes = {
  onComplete: PropTypes.func,
}

registerComponent('SwitchableLoginForm', SwitchableLoginForm);

export default SwitchableLoginForm;
