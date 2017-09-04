import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { NavDropdown, Dropdown } from 'react-bootstrap';

const UsersAccountMenu = () => {

  return (
    <NavDropdown id="accounts-dropdown" className="users-account-menu" title="Log in">
      <Components.GuestLoginForm />
    </NavDropdown>
  )
};

UsersAccountMenu.displayName = "UsersAccountMenu";

registerComponent('UsersAccountMenu', UsersAccountMenu);
