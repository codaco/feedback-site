import { Components, registerComponent, withCurrentUser, withApollo } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { intlShape } from 'meteor/vulcan:i18n';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange(field, evt) {
    let value = evt.target.value;
    if (field !== 'password') {
      value = value.trim();
    }

    this.setState({ [field]: value });
  }

  handleSubmit() {
    const {
      email = '',
      formState,
      onSubmitHook
    }  = this.state;

    this.clearMessages();
    if (!email) {
      this.showMessage('Email required', 'error');
    } else {
      this.clearMessages();

      Accounts.forgotPassword({ email: email }, (error) => {
        if (error) {
          this.showMessage(error.reason || 'Could not send reset email', 'error');
        } else {
          this.showMessage('Password reset email sent!', 'success');
          //this.clearDefaultFieldValues();
        }
        //onSubmitHook(error, formState);
        this.setState({ waiting: false });
      });
    }
  }

  clearMessages() {
    this.setState({ messages: [] });
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


  getFields() {
    return {
      email: {
        id: 'email',
        hint: this.context.intl.formatMessage({ id: 'accounts.enter_email' }),
        label: this.context.intl.formatMessage({ id: 'accounts.email' }),
        required: true,
        defaultValue: this.state.email || "",
        onChange: this.handleChange.bind(this, 'email'),
      }
    }
  }

  getButtons() {
    const buttons = [
      {
        id: 'resetPassword',
        label: "Reset Password",
        type: 'submit',
        className: 'active',
        onClick: this.handleSubmit.bind(this),
      },
    ];

    return _.indexBy(buttons, 'id');
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

ForgotPassword.contextTypes = {
  intl: intlShape
};


ForgotPassword.displayName = 'ForgotPassword';

export default ForgotPassword;
