import Users from 'meteor/vulcan:users';
import { addCallback } from 'meteor/vulcan:core';
import { createNotification } from './notifications.js';

// note: leverage weak dependencies on packages
const Comments = Package['vulcan:comments'] ? Package['vulcan:comments'].default : null;
const Posts = Package['vulcan:posts'] ? Package['vulcan:posts'].default : null;

/**
 * @summary Add notification callback when a post is approved
 */
function PostsApprovedNotification (post) {
  const notificationData = {
    post: _.pick(post, '_id', 'userId', 'title', 'url')
  };
  createNotification(post.userId, 'postApproved', notificationData);
}

/**
 * @summary Add new post notification callback on post submit
 */
function PostsNewNotifications (post) {

  let adminIds = _.pluck(Users.adminUsers({fields: {_id:1}}), '_id');
  let notifiedUserIds = _.pluck(Users.find({'notifications_posts': true}, {fields: {_id:1}}).fetch(), '_id');

  const notificationData = {
    post: _.pick(post, '_id', 'userId', 'title', 'url', 'slug')
  };

  // remove post author ID from arrays
  adminIds = _.without(adminIds, post.userId);
  notifiedUserIds = _.without(notifiedUserIds, post.userId);

  if (post.status === Posts.config.STATUS_PENDING && !!adminIds.length) {
    // if post is pending, only notify admins
    createNotification(adminIds, 'newPendingPost', notificationData);
  } else if (!!notifiedUserIds.length) {
    // if post is approved, notify everybody
    createNotification(notifiedUserIds, 'newPost', notificationData);
  }

}

if (!!Posts) {
  addCallback("posts.approve.async", PostsApprovedNotification);
  addCallback("posts.new.async", PostsNewNotifications);
}

// add new comment notification callback on comment submit
function CommentsNewNotifications (comment) {

  // note: dummy content has disableNotifications set to true
  if(Meteor.isServer && !comment.disableNotifications) {

    const post = Posts.findOne(comment.postId);
    const postAuthor = Users.findOne(post.userId);
    const notificationData = {
      comment: _.pick(comment, '_id', 'userId', 'author', 'htmlBody', 'postId'),
      post: _.pick(post, '_id', 'userId', 'title', 'url')
    };

    let userIdsNotified = [];

    // 1. Notify author of post (if they have new comment notifications turned on)
    //    but do not notify author of post if they're the ones posting the comment
    if (Users.getSetting(postAuthor, "notifications_comments", false) && comment.userId !== postAuthor._id) {
      createNotification(post.userId, 'newComment', notificationData);
      userIdsNotified.push(post.userId);
    }

    // 2. Notify previous commenters of new comment in the thread
    const comments = Comments.find({ postId: comment.postId }).fetch();
    comments.forEach((postComment) => {
      if (postComment.userId !== post.userId && postComment.userId !== comment.userId) {

        const postCommentAuthor = Users.findOne(postComment.userId);

        // do not notify parent comment author if they have reply notifications turned off
        if (Users.getSetting(postCommentAuthor, "notifications_replies", false)) {

          // add parent comment to notification data
          notificationData.parentComment = _.pick(postComment, '_id', 'userId', 'author', 'htmlBody');

          createNotification(postComment.userId, 'newReply', notificationData);
          userIdsNotified.push(postComment.userId);
        }
      }
    });

  }
}

if (!!Comments) {
  addCallback("comments.new.async", CommentsNewNotifications);
}
