import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { NavDropdown, Dropdown } from 'react-bootstrap';

const DropdownItem = (props) => {
  return (
    <div className="padded">
      {props.children}
    </div>
  );
}

const UsersAccountMenu = () => {

  return (
    <NavDropdown id="accounts-dropdown" className="users-account-menu" title="Log in">
      <DropdownItem>
        <Components.SwitchableLoginForm />
      </DropdownItem>
    </NavDropdown>
  )
};

UsersAccountMenu.displayName = "UsersAccountMenu";

registerComponent('UsersAccountMenu', UsersAccountMenu);
