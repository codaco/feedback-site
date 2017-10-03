import React from 'react';
import { Components, registerComponent, getComponent, withCurrentUser } from 'meteor/vulcan:core';
import { withRouter } from 'react-router'
import Users from 'meteor/vulcan:users';
import {Button} from 'react-bootstrap';

class UserLogin extends React.Component {
  componentWillMount() {
    if (this.props.currentUser && !this.props.currentUser.isGuest) {
      // Skip this step for non-guest users
      this.props.onComplete();
    }
  }

  render() {
    return (
      <Components.SwitchableLoginForm onComplete={this.props.onComplete} />
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

class CreatePostFlow extends React.Component {
  constructor(props) {
    super(props)
    this.onStepComplete = this.onStepComplete.bind(this);

    this.state = {
      step: 0
    }
  }

  get steps() {
    return [
      UserLogin,
      getComponent('SuggestedPosts'),
      getComponent('PostsNewForm'),
    ];
  }

  onStepComplete(redirect) {
    console.log("Complete!")
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
    const StepComponent = this.steps[this.state.step];

    return (
      <StepComponent {...this.props} onComplete={this.onStepComplete} />
    )
  }
}

registerComponent('CreatePostFlow', CreatePostFlow, withCurrentUser, withRouter);
