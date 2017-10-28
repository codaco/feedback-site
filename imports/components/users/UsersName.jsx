import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const UsersName = ({ user }) => {
  if (Users.isGuest(user)) {
    return (
      <div className="users-name">Guest</div>
    );
  }

  const flair = Users.isAdmin(user) ?
    <span className="users-flair"><FormattedMessage id="admin.flair" /></span> : null;

  return (
    <span className="users-name">
      <Link to={Users.getProfileUrl(user)}>
        {Users.getDisplayName(user)}
      </Link>
      {flair}
    </span>
  );
}

UsersName.propTypes = {
  user: PropTypes.object.isRequired,
}

UsersName.displayName = 'UsersName';

registerComponent('UsersName', UsersName);
