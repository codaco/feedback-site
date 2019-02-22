import { Components, replaceComponent, withDocument, withCurrentUser, getActions, withMutation } from 'meteor/vulcan:core';
import { Posts } from 'meteor/example-forum';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'meteor/vulcan:i18n';

class CustomPostsPage extends Component {

    render() {
        if (this.props.loading && !this.props.document) {

            return <div className="posts-page"><Components.Loading/></div>

        } else if (!this.props.document) {

            return <div className="posts-page"><FormattedMessage id="app.404"/></div>

        } else {
            const post = this.props.document;

            const htmlBody = {__html: post.htmlBody};

            return (
                <div className="posts-page">

                    <Components.HeadTags url={Posts.getPageUrl(post, true)} title={post.title} image={post.thumbnailUrl}
                                         description={post.excerpt}/>

                    <Components.PostsItem post={post} currentUser={this.props.currentUser}/>

                    {post.htmlBody ? <div className="posts-page-body" dangerouslySetInnerHTML={htmlBody}></div> : null}

                    <Components.PostsCommentsThread post={post} terms={{postId: post._id, view: 'postComments'}}/>

                </div>
            );

        }
    }
}

replaceComponent('PostsPage', CustomPostsPage);

