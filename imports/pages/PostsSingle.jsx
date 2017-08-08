import React from 'react';

import { Components } from 'meteor/vulcan:core';
//import PostsPage from '../components/posts/PostsPage';

const PostsSingle = (props, context) => {
  return <Components.PostsPage documentId={props.params._id} />
};

PostsSingle.displayName = "PostsSingle";

export default PostsSingle;
