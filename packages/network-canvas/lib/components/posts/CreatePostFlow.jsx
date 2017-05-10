import React from 'react';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { withRouter } from 'react-router'
import Users from 'meteor/vulcan:users';
import {Button} from 'react-bootstrap';
import PostsNewForm from './PostsNewForm.jsx';

const SuggestRelated = (props) => {
  const goHome = function() {
    props.onComplete('/');
  }

  return (
    <div>
      No Suggestions
      <Button bsStyle="primary" onClick={(ev) => props.onComplete()}>Next</Button>
      <Button onClick={goHome}>Cancel</Button>
    </div>
  )
}

class UserLogin extends React.Component {
  componentWillMount() {
    if (!Users.isGuest(this.props.currentUser)) {
      this.props.onComplete();
    }
  }

  render() {
    const onComplete = this.props.onComplete;

    function continueAsGuest() {
      Meteor.loginVisitor(null, (err) => onComplete());
    }

    return (
      <div>
        <Components.AccountsLoginForm onSignedInHook={onComplete} />
        <Button onClick={continueAsGuest}>...or continue as Guest</Button>
      </div>
    )
  }
}

const steps = [SuggestRelated, UserLogin, PostsNewForm];

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
    console.log("Render with step " + this.state.step)

    return (
      <StepComponent {...this.props} onComplete={this.onStepComplete} />
    )
  }
}

registerComponent('CreatePostFlow', CreatePostFlow, withCurrentUser, withRouter);