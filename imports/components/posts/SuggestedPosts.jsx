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

    this.doSearch = this.doSearch.bind(this);
    this.state = {
      query: "",
    }
  }

  searchTerms() {
    return {
      query: this.state.query
    };
  }

  doSearch(evt) {
    const query = evt.target.value;

    delay(() => {
      this.setState({ query });
    }, 700 );
  }

  render() {
    return (
      <div>
        <form>
          <label>
            <p>How would you like to improve Network Canvas?</p>
            <input type="text" onChange={this.doSearch} />
          </label>
        </form>
        <WrappedSuggestionList terms={this.searchTerms()} />
        <button className="btn btn-primary" onClick={this.props.onComplete}>
          Create a new post
        </button>
      </div>
    )
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
