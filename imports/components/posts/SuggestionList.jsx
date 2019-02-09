import React from "react";
import {Link} from "react-router";
import {registerComponent} from "meteor/vulcan:lib";
import {withList} from "meteor/vulcan:core";
import { Posts } from "meteor/example-forum";

class SuggestionList extends React.Component {

    renderPostRow(post) {
        return (
            <Link key={post._id} className="list-group-item" to={Posts.getPageUrl(post)}>
                <h4 className="list-group-item-heading">{post.title}</h4>
                {post.body ?
                    <div className="list-group-item-text">{post.body.slice(0, 200)}</div> : null
                }
            </Link>
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
                <div className="list-group">
                    {posts}
                </div>
            </div>
        )
    }
}

const options = {
    collection: Posts,
    queryName: 'postsListQuery',
    fragmentName: 'PostsList',
};

registerComponent('SuggestionList', SuggestionList, [withList, options]);