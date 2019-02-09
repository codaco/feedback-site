import { Components, replaceComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router';
import { Posts } from 'meteor/example-forum';

const CustomPostsCommenters = ({post}) => {
    return (
        <div className="posts-commenters">
            <div className="posts-commenters-discuss">
                <Link to={Posts.getPageUrl(post)}>
                    <Components.Icon name="comment" />
                    <span className="posts-commenters-comments-count">{post.commentCount}</span>
                    <span className="sr-only">Comments</span>
                </Link>
            </div>
        </div>
    );
};

CustomPostsCommenters.displayName = "PostsCommenters";

replaceComponent('PostsCommenters', CustomPostsCommenters);