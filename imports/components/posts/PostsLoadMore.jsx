import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const PostsLoadMore = ({loading, loadMore, count, totalCount}) => {
  if (loading) {
    return (
      <Components.Loading />
    );
  }

  return (
    <button type="button" className="btn btn-default btn-block" onClick={e => {e.preventDefault(); loadMore();}}>
      <span><FormattedMessage id="posts.load_more"/></span>
      &nbsp;
      {totalCount ? <span className="load-more-count">{`(${count}/${totalCount})`}</span> : null}

    </button>
  );
}

PostsLoadMore.displayName = "PostsLoadMore";

registerComponent('PostsLoadMore', PostsLoadMore);
