import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { registerComponent, withCurrentUser } from 'meteor/vulcan:core';

class GuestLoginLink extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.currentUser && this.props.currentUser.isGuest) {
      this.props.doneCallback();
    }

    Meteor.loginVisitor(null, (err) => {
      this.props.client.resetStore();
      if (this.props.doneCallback) {
        this.props.doneCallback();
      }
    });
  }

  render() {
    if (this.props.currentUser && !this.props.currentUser.isGuest) {
      return null;
    }

    return (
      <a onClick={this.handleClick} href="#">
        {this.props.text}
      </a>
    )
  }

}

GuestLoginLink.propTypes = {
  text: PropTypes.string.isRequired,
  doneCallback: PropTypes.func,
}

registerComponent('GuestLoginLink', GuestLoginLink, withApollo, withCurrentUser);
