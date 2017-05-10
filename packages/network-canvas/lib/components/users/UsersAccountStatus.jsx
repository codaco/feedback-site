import React from 'react';
import Users from 'meteor/vulcan:users';
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';
import { withApollo } from 'react-apollo';
import { Button, Modal } from 'react-bootstrap';

const LoggedInStatus = (props) => {
  const {currentUser, client} = props;

  const handleLogout = function() {
    Meteor.logout(function() { client.resetStore() });
  }

  return (
    <div>
      Logged in as {Users.getDisplayName(props.currentUser)}
      <Button bsSize="small" onClick={handleLogout}>Log out</Button>
    </div>
  )
}

class GuestStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false};

  }

  openModal() {
    this.setState({showModal: true});
  }

  closeModal() {
    this.setState({showModal: false});
  }

  render() {
    const openModal = () => this.setState({showModal: true});
    const closeModal = () => this.setState({showModal: false});

    return (
      <div>
        Guest
        <Button bsSize="small" onClick={openModal}>Log in</Button>

        <Modal show={this.state.showModal} onHide={closeModal}>
          <Modal.Body>
            <Components.AccountsLoginForm />
          </Modal.Body>
        </Modal>

      </div>
    )
  }
}

const UsersAccountStatus = (props, context) => {
  return (
    <div className="users-account-status">
      { Users.isGuest(props.currentUser) ?
        <GuestStatus /> :
        <LoggedInStatus {...props} />
      }
    </div>
  )
}

UsersAccountStatus.displayName = 'UsersAccountStatus';

UsersAccountStatus.propTypes = {
  currentUser: React.PropTypes.object,
  client: React.PropTypes.object,
}

registerComponent('UsersAccountStatus', UsersAccountStatus, withCurrentUser, withApollo);