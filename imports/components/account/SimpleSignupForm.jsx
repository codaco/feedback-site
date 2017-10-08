import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { withApollo } from 'react-apollo';
import { intlShape } from 'meteor/vulcan:i18n';

class SimpleSignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.onSignedIn = this.onSignedIn.bind(this);
    this.state = {};
  }

  handleChange(field, evt) {
    let value = evt.target.value;
    if (field !== 'password') {
      value = value.trim();
    }

    this.setState({ [field]: value });
  }

  showMessage(messageText, type) {
    this.setState(({ messages = [] }) => {
      messages.push({
        message: messageText,
        type,
      });
      return { messages };
    });
  }

  clearMessages() {
    this.setState({ messages: [] });
  }

  onSignedIn() {
    this.props.client.resetStore();

    if (typeof this.props.onComplete === 'function') {
      this.props.onComplete();
    }
  }

  signUp() {
    const { username, email, password } = this.state;

    let error = false;
    this.clearMessages();

    if (!username) {
      this.showMessage('Username required', 'error');
      error = true;
    }

    if (!email) {
      this.showMessage('Email required', 'error');
      error = true;
    }

    if (!password) {
      this.showMessage('Password required', 'error');
      error = true;
    } else if (password.length < 8) {
      this.showMessage('Password must be 8 or more characters', 'error');
      error = true;
    }

    if (!error) {
      Accounts.createUser({ username, email, password }, (error) => {
        if (error) {
          this.showMessage(error.reason || 'Could not sign in', 'error');
        } else {
          this.showMessage('Account created!', 'info');
          this.onSignedIn();
        }
      });
    }
  }

  getButtons() {
    const buttons = [
      {
        id: 'signUp',
        label: this.context.intl.formatMessage({ id: 'accounts.sign_up' }),
        type: 'submit',
        className: 'active',
        onClick: this.signUp.bind(this),
      },
    ].concat(this.props.otherButtons);

    return _.indexBy(buttons, 'id');
  }

  getFields() {
    return {
      username: {
        id: 'username',
        hint: this.context.intl.formatMessage({id: 'accounts.enter_username'}),
        label: this.context.intl.formatMessage({id: 'accounts.username'}),
        required: true,
        defaultValue: this.state.username || "",
        onChange: this.handleChange.bind(this, 'username'),
      },
      email: {
        id: 'email',
        hint: this.context.intl.formatMessage({id: 'accounts.enter_email'}),
        label: this.context.intl.formatMessage({id: 'accounts.email'}),
        required: true,
        defaultValue: this.state.email || "",
        onChange: this.handleChange.bind(this, 'email'),
      },
      password: {
        id: 'password',
        hint: this.context.intl.formatMessage({ id: 'accounts.enter_password' }),
        label: this.context.intl.formatMessage({ id: 'accounts.password' }),
        type: 'password',
        required: true,
        defaultValue: this.state.password || "",
        onChange: this.handleChange.bind(this, 'password'),
      },
    };
  }

  render() {
    return (
      <Components.AccountsForm
        fields={this.getFields()} 
        buttons={this.getButtons()}
        messages={this.state.messages}
        oauthServices={{}}
        ready
      />
    );
  }
}

SimpleSignupForm.propTypes = {
  onComplete: PropTypes.func,
  otherButtons: PropTypes.array,
};

SimpleSignupForm.contextTypes = {
  intl: intlShape
};

registerComponent('SimpleSignupForm', SimpleSignupForm, withCurrentUser, withApollo);
