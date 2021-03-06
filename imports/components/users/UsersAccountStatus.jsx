import React from 'react';
import PropTypes from 'prop-types';
import Users from 'meteor/vulcan:users';
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';

const UsersAccountStatus = (props, context) => {
  return (
    !!props.currentUser ?
      <Components.UsersMenu/> :
      <Components.UsersAccountMenu/>
  )
}

UsersAccountStatus.displayName = 'UsersAccountStatus';

UsersAccountStatus.propTypes = {
  currentUser: PropTypes.object,
}

registerComponent('UsersAccountStatus', UsersAccountStatus, withCurrentUser);
