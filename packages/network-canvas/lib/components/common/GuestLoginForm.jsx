import { Components, registerComponent, getFragment, withMessages } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';

const GuestLoginForm = (props) => {
  const handleGuestLogin = function(ev) {
    Meteor.loginVisitor();
  }

  return (
    <div>
      <Components.AccountsButton
        label="Continue as Guest"
        onClick={handleGuestLogin}
      />
      <Components.AccountsLoginForm />
    </div>
  )
}

GuestLoginForm.displayName = 'GuestLoginForm';

registerComponent('GuestLoginForm', GuestLoginForm);