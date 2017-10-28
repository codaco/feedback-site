import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Components, registerComponent } from 'meteor/vulcan:core';

const LOGIN_MODE = "login";
const SIGNUP_MODE = "signup";

class SwitchableLoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: LOGIN_MODE,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
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
      onClick: this.handleToggle
    }
  }

  switchToSignupButton() {
    return {
      id: 'switchToSignup',
      label: 'Create new account',
      type: 'link',
      onClick: this.handleToggle
    }
  }

  renderToggleLink() {
    const text = (this.state.mode === LOGIN_MODE) ? "Create new account" : "Log in";
    return (<a href="#" onClick={this.handleToggle}>{text}</a>);
  }

  renderLoginForm() {
    if (this.state.mode === LOGIN_MODE) {
      return (
        <Components.SimpleLoginForm onComplete={this.props.onComplete} />
      );
    }

    return (
      <Components.SimpleSignupForm onComplete={this.props.onComplete} />
    );
  }

  render() {
    return (
      <div>
        {this.renderLoginForm()}
        <p>
          {this.renderToggleLink()}
        </p>
        <p>
          <Link to="/reset-password">Forgot password</Link>
        </p>
        <p>
          Or <Components.GuestLoginLink doneCallback={this.props.onComplete}>
            continue as a guest
          </Components.GuestLoginLink>
        </p>
      </div>
    );
  }

}

SwitchableLoginForm.propTypes = {
  onComplete: PropTypes.func,
}

registerComponent('SwitchableLoginForm', SwitchableLoginForm);
