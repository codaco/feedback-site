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

  handleNewComment(replyComment = {}) {
    this.setState({ replyComment });
    window.scrollBy(0, 9999);   // Just scroll to the bottom of the page
    // TODO: focus input
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
          <h4 className="posts-comments-thread-title"><FormattedMessage id="comments.comments"/></h4>
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
  currentUser: PropTypes.object
};

const options = {
  collection: Comments,
  queryName: 'commentsListQuery',
  fragmentName: 'CommentsList',
  limit: 0,
};

registerComponent('PostsCommentsThread', PostsCommentsThread, [withList, options], withCurrentUser);
