import React from 'react';
import Users from 'meteor/vulcan:users';
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';
import { Button } from 'react-bootstrap';

const LoggedInStatus = (props) => {
  const handleLogout = () => Meteor.logout(() => client.resetStore());

  return (
    <div>
      Logged in as {Users.getDisplayName(props.currentUser)}
      <Button bsSize="small" onClick={handleLogout}>Log out</Button>
    </div>
  )
}

const GuestStatus = (props) => {
  return (
    <div>
      Guest
      <Button bsSize="small">Log in</Button>
    </div>
  )
}

const UsersAccountStatus = (props, context) => {
  return (
    <div className="users-account-status">
      { Users.isGuest(props.currentUser) ?
        <GuestStatus /> :
        <LoggedInStatus currentUser={props.currentUser} />
      }
    </div>
  )
}

UsersAccountStatus.displayName = 'UsersAccountStatus';

UsersAccountStatus.propTypes = {
  currentUser: React.PropTypes.object,
}

registerComponent('UsersAccountStatus', UsersAccountStatus, withCurrentUser);