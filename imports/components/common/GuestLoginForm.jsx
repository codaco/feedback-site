import { Components, getRawComponent, withCurrentUser, registerComponent } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { withApollo } from 'react-apollo';
import React, { PropTypes, Component } from 'react';
import { Button } from 'react-bootstrap';

class GuestLoginForm extends getRawComponent('AccountsLoginForm') {

  handleGuestLogin() {
    const onSignedInHook = this.state.onSignedInHook.bind(this);
    Meteor.loginVisitor(null, (err) => onSignedInHook());
  }

  buttons() {
    const buttons = super.buttons();

    const { formState, waiting } = this.state;
    const currentUser = typeof this.props.currentUser !== 'undefined'
      ? this.props.currentUser : this.state.currentUser;

    if (Users.isGuest(this.props.currentUser) && buttons['switchToChangePassword']) {
      delete buttons['switchToChangePassword'];
    }

    if (this.showSignInLink()) {
      buttons['guestSignIn'] = {
        id: 'guestSignIn',
        label: 'Continue as Guest',
        type: 'link',
        disabled: waiting,
        onClick: this.handleGuestLogin.bind(this),
      }
    }

    return buttons;
  }

}

GuestLoginForm.displayName = 'GuestLoginForm';

registerComponent('GuestLoginForm', GuestLoginForm, withCurrentUser, withApollo);
