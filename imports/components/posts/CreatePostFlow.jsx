import React from 'react';
import { Components, registerComponent, getComponent, withCurrentUser } from 'meteor/vulcan:core';
import { withRouter } from 'react-router';
import Users from 'meteor/vulcan:users';
import PropTypes from 'prop-types';

const LOGIN_STEP = 'login';
const SUGGEST_STEP = 'suggest';
const CREATE_STEP = 'create';

class CreatePostFlow extends React.Component {
  constructor(props) {
    super(props)

    this.handleLoginComplete = this.handleLoginComplete.bind(this);
    this.handleSuggestComplete = this.handleSuggestComplete.bind(this);
    this.handlePostCreated = this.handlePostCreated.bind(this);

    this.state = {
      step: this.initialStep(),
      title: '',
    };
  }

  initialStep() {
    if (!this.props.currentUser) {
      return LOGIN_STEP;
    }
    return SUGGEST_STEP;
  }

  handlePostCreated(post) {
    this.props.router.push(redirect);
  }

  handleLoginComplete() {
    this.setState({
      step: SUGGEST_STEP
    });
  }

  handleSuggestComplete(data) {
    this.setState({
      step: CREATE_STEP,
      title: data.title,
    });
  }

  renderLogin() {
    return (
      <div>
        <p>Please log in to create a post.</p>
        <Components.SwitchableLoginForm onComplete={this.handleLoginComplete}/>
      </div>
    )
  }

  render() {
    switch (this.state.step) {
      case LOGIN_STEP:
        return this.renderLogin();
      case SUGGEST_STEP:
        return (<Components.SuggestedPosts onComplete={this.handleSuggestComplete} />);
      case CREATE_STEP:
        return (<Components.PostsNewForm title={this.state.title} closeModal={this.props.closeModal} />);
    }
  }
}

CreatePostFlow.propTypes = {
  closeModal: PropTypes.func,
}


registerComponent('CreatePostFlow', CreatePostFlow, withCurrentUser, withRouter);
