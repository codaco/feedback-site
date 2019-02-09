import React from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { Posts } from "meteor/example-forum";

const delay = (function(){
    var timer = 0;
    return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

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
        }, 500 );
    }

    handleCreate(event) {
        event.preventDefault();
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

                    <Components.SuggestionList terms={this.searchTerms()} />

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

registerComponent('SuggestedPosts', SuggestedPosts, withCurrentUser );