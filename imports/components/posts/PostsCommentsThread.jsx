import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withCurrentUser, Components, registerComponent, Utils } from 'meteor/vulcan:core';
import Comments from 'meteor/vulcan:comments';

class PostsCommentsThread extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      replyComment: {},
    };

    this.handleNewComment = this.handleNewComment.bind(this);
  }

  prefilledReply() {
    const quoted = this.state.replyComment.body;
    if (quoted) {
      return quoted.split('\n').map(line => `> ${line}`).join('/n') + '\n\n';
    }

    return "";
  }

  componentDidMount() {
    if (this.props.currentUser &&
        this.props.post.userId == this.props.currentUser._id) {
      // Ugly hack- refetch own posts after initial load because auto-subscribing to self
      // posts happens async. Must refetch to get correct status for subscribe button after initially
      // creating a post.
      setTimeout(() => {
        this.props.refetchUser();
      }, 500);
    }
  }

  handleNewComment(replyComment = {}) {
    this.setState({ replyComment });
    window.scrollBy(0, 9999);   // Just scroll to the bottom of the page
    // TODO: focus input
  }

  renderSubscribeButton() {
    const user = this.props.currentUser;

    if (user && !user.isGuest) {
      return (
        <Components.SubscribeTo document={this.props.post} className="subscribe-button" />
      );
    }
    return null;
  }

  render() {
    const {loading, terms: { postId }, results, totalCount, currentUser} = this.props;

    if (loading) {

      return <div className="posts-comments-thread"><Components.Loading/></div>

    } else {

      const resultsClone = _.map(results, _.clone); // we don't want to modify the objects we got from props
      const nestedComments = Utils.unflatten(resultsClone, {idProperty: '_id', parentIdProperty: 'parentCommentId'});

      return (
        <div className="posts-comments-thread">
          <h4 className="posts-comments-thread-title">
            <FormattedMessage id="comments.comments" />
            {this.renderSubscribeButton()}
          </h4>
          <Components.CommentsList
            currentUser={currentUser}
            comments={nestedComments}
            commentCount={totalCount}
            onNewComment={this.handleNewComment}
          />
          <div className="posts-comments-thread-new">
            <h4><FormattedMessage id="comments.new"/></h4>
            <Components.CommentsNewForm
              key={this.state.replyComment._id}   // Add key so form re-initializes when initialBody changes :-(
              postId={postId}
              initialBody={this.prefilledReply()}
              type="comment"
            />
          </div>
        </div>
      );
    }
  }

}

PostsCommentsThread.displayName = 'PostsCommentsThread';

PostsCommentsThread.propTypes = {
  currentUser: PropTypes.object,
  post: PropTypes.object,
};

const options = {
  collection: Comments,
  queryName: 'commentsListQuery',
  fragmentName: 'CommentsList',
  limit: 0,
};

registerComponent('PostsCommentsThread', PostsCommentsThread, [withList, options], withCurrentUser);
