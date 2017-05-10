import { addCallback, getSetting, Utils } from 'meteor/vulcan:core';

/**
 * For some reason simpleschema isn't setting some default fields on create.
 *
 */
function postsSetDefaultValues(post, user) {
  console.log("doing the set sticky thing")
  post.sticky = post.sticky || false;

  return post;
}

addCallback("posts.new.sync", postsSetDefaultValues);