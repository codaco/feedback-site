import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { Components, registerComponent, withCurrentUser, withList } from 'meteor/vulcan:core';
import { withApollo } from 'react-apollo';
import { intlShape } from 'meteor/vulcan:i18n';
import Posts from "meteor/vulcan:posts";
import { Link } from 'react-router';

const delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

class SuggestionList extends React.Component {

  renderPostRow(post) {
    return (
      <li key={post._id}>
        <Link to={Posts.getLink(post)}>
          {post.title}
        </Link>
      </li>
    );
  }

  render() {
    if (!this.props.terms.query) {
      // Don't show suggestions for an empty query
      return null;
    }

    const results = this.props.results;
    if (!results || !results.length) {
      return null;
    }

    const posts = results.slice(0, 5).map(post => this.renderPostRow(post));

    return (
      <div>
        <p>Comment on an existing suggestion:</p>
        <ul>
          {posts}
        </ul>
      </div>
    )
  }
}

const options = {
  collection: Posts,
  queryName: 'postsListQuery',
  fragmentName: 'PostsList',
};

const WrappedSuggestionList = withList(options)(SuggestionList);

class SuggestedPosts extends React.Component {
  constructor(props) {
    super(props);

    this.handleQueryUpdate = this.handleQueryUpdate.bind(this);
    this.handleCreate = this.handleCreate.bind(this);

    this.state = {
      query: "",
      debouncedQuery: "",
    };
  }

  searchTerms() {
    return {
      query: this.state.debouncedQuery
    };
  }

  handleQueryUpdate(evt) {
    const query = evt.target.value;
    this.setState({ query });

    delay(() => {
      this.setState({ debouncedQuery: query });
    }, 700 );
  }

  handleCreate() {
    this.props.onComplete({ title: this.state.query });
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="postTitle">
              How would you like to improve Network Canvas?
            </label>
            <input type="text" className="form-control" id="postTitle" onChange={this.handleQueryUpdate} />
          </div>

          <WrappedSuggestionList terms={this.searchTerms()} />

          <button type="submit" className="btn btn-primary" onClick={this.handleCreate}>
            Create a new post
          </button>
        </form>
      </div>
    );
  }
}

SuggestedPosts.displayName = "SuggestedPosts";

SuggestedPosts.propTypes = {
  onComplete: PropTypes.func.isRequired,
  results: PropTypes.array,
  terms: PropTypes.object,
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  count: PropTypes.number,
  totalCount: PropTypes.number,
  loadMore: PropTypes.func,
  showHeader: PropTypes.bool,
};

registerComponent('SuggestedPosts', SuggestedPosts, withCurrentUser, );
