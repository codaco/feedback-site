import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';

const UsersName = ({ user }) => {
  if (Users.isGuest(user)) {
    return (
      <div className="users-name">Guest</div>
    );
  }

  return (
    <Link className="users-name" to={Users.getProfileUrl(user)}>
      {Users.getDisplayName(user)}
    </Link>
  );
}

UsersName.propTypes = {
  user: PropTypes.object.isRequired,
}

UsersName.displayName = 'UsersName';

registerComponent('UsersName', UsersName);
