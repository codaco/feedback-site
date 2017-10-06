import React from 'react';
import { Components, registerComponent, getComponent, withCurrentUser } from 'meteor/vulcan:core';
import { withRouter } from 'react-router'
import Users from 'meteor/vulcan:users';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

const SUGGEST_STEP = 'suggest';
const CREATE_STEP = 'create';

class CreatePostFlow extends React.Component {
  constructor(props) {
    super(props)

    this.handleSuggestComplete = this.handleSuggestComplete.bind(this);
    this.handlePostCreated = this.handlePostCreated.bind(this);

    this.state = {
      step: SUGGEST_STEP,
      title: '',
    };
  }

  handlePostCreated(post) {
    this.props.router.push(redirect);
  }

  handleSuggestComplete(data) {
    this.setState({
      step: CREATE_STEP,
      title: data.title,
    });
  }

  render() {
    if (!this.props.currentUser || this.props.currentUser.isGuest) {
      // ask logged out people and guest users if they want to log in
      return (
        <Components.SwitchableLoginForm />
      )
    }

    if (this.state.step === SUGGEST_STEP) {
      return (
        <Components.SuggestedPosts onComplete={this.handleSuggestComplete} />
      );
    } else {
      return (
        <Components.PostsNewForm title={this.state.title} closeModal={this.props.closeModal} />
      );
    }
  }
}

CreatePostFlow.propTypes = {
  closeModal: PropTypes.func,
}


registerComponent('CreatePostFlow', CreatePostFlow, withCurrentUser, withRouter);
