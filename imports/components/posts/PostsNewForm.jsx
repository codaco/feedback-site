import { Components, registerComponent, getRawComponent, getFragment, withMessages } from 'meteor/vulcan:core';
import Posts from "meteor/vulcan:posts";
import React, { PropTypes, Component } from 'react';
import { intlShape } from 'react-intl';
import { withRouter } from 'react-router'

const formSchema = {
  title: {
    type: String,
    optional: false,
    max: 500,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: "text",
    order: 20
  },
  body: {
    type: String,
    optional: true,
    max: 3000,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: "textarea",
    order: 30
  },
}

const PostsNewForm = (props, context) =>
  <Components.ShowIf
      check={Posts.options.mutations.new.check}
      failureComponent={<Components.AccountsLoginForm />}
    >
      <div className="posts-new-form">
        <Components.SmartForm
          collection={Posts}
          schema={formSchema}
          mutationFragment={getFragment('PostsPage')}
          successCallback={post => {
            props.closeModal();
            props.router.push({pathname: Posts.getPageUrl(post)});
            props.flash(context.intl.formatMessage({id: "posts.created_message"}), "success");
          }}
        />
      </div>
    </Components.ShowIf>

PostsNewForm.propTypes = {
  closeModal: React.PropTypes.func,
  router: React.PropTypes.object,
  flash: React.PropTypes.func,
}

PostsNewForm.contextTypes = {
  closeCallback: React.PropTypes.func,
  intl: intlShape
};

PostsNewForm.displayName = "PostsNewForm";

registerComponent('PostsNewForm', PostsNewForm, withRouter, withMessages);

export default PostsNewForm;