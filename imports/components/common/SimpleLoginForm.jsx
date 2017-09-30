import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { withApollo } from 'react-apollo';
import { intlShape } from 'meteor/vulcan:i18n';

class SimpleLoginForm extends React.Component {
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
    this.props.onComplete();
  }

  signIn() {
    const { usernameOrEmail, password } = this.state;

    let error = false;
    this.clearMessages();

    if (!usernameOrEmail) {
      this.showMessage('Username required', 'error');
      error = true;
    }

    if (!password) {
      this.showMessage('Password required', 'error');
      error = true;
    }

    if (!error) {
      Meteor.loginWithPassword(usernameOrEmail, password, (error, result) => {
        if (error) {
          this.showMessage(error.reason || 'Could not sign in', 'error');
        } else {
          this.showMessage('Signed in!', 'info');
          this.onSignedIn();
        }
      });
    }
  }

  getButtons() {
    const buttons = [
      {
        id: 'signIn',
        label: this.context.intl.formatMessage({ id: 'accounts.sign_in' }),
        type: 'submit',
        className: 'active',
        onClick: this.signIn.bind(this),
      },
    ].concat(this.props.otherButtons || []);

    console.log("gettin buttons", buttons)
    return _.indexBy(buttons, 'id');
  }

  getFields() {
    return {
      usernameOrEmail: {
        id: 'usernameOrEmail',
        hint: this.context.intl.formatMessage({id: 'accounts.enter_username_or_email'}),
        label: this.context.intl.formatMessage({id: 'accounts.username_or_email'}),
        required: true,
        defaultValue: this.state.usernameOrEmail || "",
        onChange: this.handleChange.bind(this, 'usernameOrEmail'),
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

SimpleLoginForm.propTypes = {
  onComplete: PropTypes.func,
  otherButtons: PropTypes.array,
}

SimpleLoginForm.contextTypes = {
  intl: intlShape
}

registerComponent('SimpleLoginForm', SimpleLoginForm, withCurrentUser, withApollo);
