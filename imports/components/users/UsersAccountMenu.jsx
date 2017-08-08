import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Dropdown } from 'react-bootstrap';

const UsersAccountMenu = () => {

  return (
    <Dropdown id="accounts-dropdown" className="users-account-menu">
      <Dropdown.Toggle>
        <FormattedMessage id="users.log_in"/>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Components.GuestLoginForm />
      </Dropdown.Menu>
    </Dropdown>
  )
};

UsersAccountMenu.displayName = "UsersAccountMenu";

registerComponent('UsersAccountMenu', UsersAccountMenu);
