import { Components, registerComponent, withList, withCurrentUser, Utils } from 'meteor/vulcan:core';
import React from 'react';
import Users from 'meteor/vulcan:users';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router';
import { FormattedMessage, intlShape } from 'react-intl';

const Error = ({error}) => <Alert className="flash-message" bsStyle="danger"><FormattedMessage id={error.id} values={{value: error.value}}/>{error.message}</Alert>

const UserItem = (props) => {
  const { user } = props;

  return (
    <div className="posts-item">
      <div className="posts-item-content">
        <h3 className="posts-item-title">
          <Link className="users-name" to={Users.getEditUrl(user)}>{Users.getDisplayName(user)}</Link>
        </h3>
        {user.isAdmin ? <p className="bg-info">Admin</p> : null}
      </div>
    </div>
  )

}

const UsersList = (props) => {
  const { results, loading, count, currentUser, error } = props;

  if (!currentUser || !currentUser.isAdmin) {
    return (
      <Alert className="flash-message">You do not have permission to view this page</Alert>
    )
  } else if (currentUser.isAdmin && results && results.length) {
    return (
      <div className="posts-list">
        {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
        <div className="posts-list-content">
          {results.map(user => <UserItem user={user} key={user._id} />)}
        </div>
      </div>
    )
  } else {
    <Alert className="flash-message">No results</Alert>
  }
}

UsersList.displayName = 'UsersList';

const options = {
  collection: Users,
  queryName: 'usersListQuery',
  fragmentName: 'UsersProfile',
}

registerComponent('UsersList', UsersList, withCurrentUser, [withList, options]);