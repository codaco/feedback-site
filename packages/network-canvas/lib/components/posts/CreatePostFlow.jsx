import React from 'react';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { withRouter } from 'react-router'
import Users from 'meteor/vulcan:users';
import {Button} from 'react-bootstrap';
import PostsNewForm from './PostsNewForm.jsx';

class UserLogin extends React.Component {
  componentWillMount() {
    if (this.props.currentUser) {
      // Skip this step if there's a user logged in (even a guest user)
      this.props.onComplete();
    }
  }

  render() {
    return (
      <Components.GuestLoginForm onSignedInHook={this.props.onComplete} />
    )
  }
}

const SuggestRelated = (props) => {
  return (
    <div>
      No Suggestions
      <Button bsStyle="primary" onClick={(ev) => props.onComplete()}>Next</Button>
    </div>
  )
}

const steps = [UserLogin, SuggestRelated, PostsNewForm];

class CreatePostFlow extends React.Component {
  constructor(props) {
    super(props)
    this.onStepComplete = this.onStepComplete.bind(this);

    this.state = {
      step: 0
    }
  }

  onStepComplete(redirect) {
    if (redirect) {
      this.props.router.push(redirect);
    } else {
      this.setState((prevState) => {
        const state = { step: prevState.step + 1 };
        return state;
      });
    }
  }

  render() {
    const StepComponent = steps[this.state.step];

    return (
      <StepComponent {...this.props} onComplete={this.onStepComplete} />
    )
  }
}

registerComponent('CreatePostFlow', CreatePostFlow, withCurrentUser, withRouter);