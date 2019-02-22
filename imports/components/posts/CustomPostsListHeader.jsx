import { Components, replaceComponent } from 'meteor/vulcan:core';
import React from 'react';

const CustomPostsListHeader = () => {

    return (
        <div>
            <div className="posts-list-header">
                <div className="posts-list-header-categories">
                    <Components.CategoriesMenu />
                </div>
                <Components.PostsViews />
                <Components.SearchForm/>
                <Components.PostsNewButton/>
            </div>
        </div>
    )
}

CustomPostsListHeader.displayName = "CustomPostsListHeader";

replaceComponent('PostsListHeader', CustomPostsListHeader);
