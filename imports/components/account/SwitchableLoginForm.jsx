import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';

const LOGIN_MODE = "login";
const SIGNUP_MODE = "signup";

class SwitchableLoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: LOGIN_MODE,
    };

    this.handleGuestLogin = this.handleGuestLogin.bind(this);
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

  handleGuestLogin() {
    if (this.props.currentUser && this.props.currentUser.isGuest) {
      this.props.onComplete();
      return;
    }

    Meteor.loginVisitor(null, (err) => {
      this.props.client.resetStore();
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

  renderLoginForm() {
    if (this.state.mode === LOGIN_MODE) {
      return (
        <Components.SimpleLoginForm onComplete={this.props.onComplete} otherButtons={[this.switchToSignupButton()]} />
      );
    }

    return (
      <Components.SimpleSignupForm onComplete={this.props.onComplete} otherButtons={[this.switchToLoginButton()]} />
    );
  }

  render() {
    return (
      <div>
        {this.renderLoginForm()}
        <p>
          Or <a href="#" onClick={this.handleGuestLogin}>continue as a guest</a>
        </p>
      </div>
    );
  }

}

SwitchableLoginForm.propTypes = {
  onComplete: PropTypes.func,
}

registerComponent('SwitchableLoginForm', SwitchableLoginForm, withCurrentUser, withApollo);
