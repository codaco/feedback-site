import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Meteor } from 'meteor/meteor';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { LinkContainer } from 'react-router-bootstrap';
import Users from 'meteor/vulcan:users';
import { withApollo } from 'react-apollo';

const UsersMenu = ({currentUser, client}) =>
  <NavDropdown id="user-dropdown" title={Users.getDisplayName(currentUser)}>
    <LinkContainer to={`/users/${currentUser.slug}`}>
      <MenuItem className="dropdown-item" eventKey="1"><FormattedMessage id="users.profile"/></MenuItem>
    </LinkContainer>
    <LinkContainer to={`/account`}>
      <MenuItem className="dropdown-item" eventKey="2"><FormattedMessage id="users.edit_account"/></MenuItem>
    </LinkContainer>

    <LinkContainer to={`/admin`}>
      <MenuItem className="dropdown-item" eventKey="2">Admin</MenuItem>
    </LinkContainer>
    <MenuItem className="dropdown-item" eventKey="4" onClick={() => Meteor.logout(() => client.resetStore())}><FormattedMessage id="users.log_out"/></MenuItem>
  </NavDropdown>


UsersMenu.propsTypes = {
  currentUser: PropTypes.object,
  client: PropTypes.object,
};

registerComponent('UsersMenu', UsersMenu, withCurrentUser, withApollo);
