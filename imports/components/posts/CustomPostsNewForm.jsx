import { Components, replaceComponent, withMessages } from 'meteor/vulcan:core';
import { getFragment } from 'meteor/vulcan:lib';
import { Posts } from "meteor/example-forum";
import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'meteor/vulcan:i18n';
import { withRouter } from 'react-router';
import SimpleSchema from 'simpl-schema';

const formSchema = new SimpleSchema({
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
})._schema;

const CustomPostsNewForm = (props, context) =>
    <Components.ShowIf
        check={Posts.options.mutations.new.check}
        failureComponent={<div><p className="posts-new-form-message"><FormattedMessage id="posts.sign_up_or_log_in_first" /></p><Components.AccountsLoginForm /></div>}
    >
        <div className="posts-new-form">
            <Components.SmartForm
                collection={Posts}
                schema={formSchema}
                layout="vertical"
                mutationFragment={getFragment('PostsPage')}
                prefilledProps={ { title: props.title, body: props.body } }
                successCallback={post => {
                    props.closeModal();
                    props.router.push({pathname: props.redirect || Posts.getPageUrl(post)});
                    // props.flash(context.intl.formatMessage({id: "posts.created_message"}), "success");
                    props.flash({ id: 'posts.created_message', type: 'success'});

                }}
            />
        </div>
    </Components.ShowIf>

CustomPostsNewForm.propTypes = {
    closeModal: PropTypes.func,
    router: PropTypes.object,
    flash: PropTypes.func,
    redirect: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
}

CustomPostsNewForm.contextTypes = {
    closeCallback: PropTypes.func,
    intl: intlShape
};

CustomPostsNewForm.displayName = "PostsNewForm";

replaceComponent('PostsNewForm', CustomPostsNewForm, withRouter, withMessages);
