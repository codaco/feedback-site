import { Components, replaceComponent, registerComponent, withCurrentUser, withDocument} from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';

class CustomUsersProfile extends React.Component {
    get user() {
        return this.props.document;
    }

    renderBio() {
        if (!this.user || !this.user.htmlBio) { return null; }

        return (
            <div className="row">
                <label className="col-sm-2"><FormattedMessage id="users.bio" /></label>
                <div className="col-sm-10" dangerouslySetInnerHTML={{__html: this.user.htmlBio}}></div>
            </div>
        );
    }

    renderContactInfo() {
        //console.log(this.user);
        if (!this.user || !this.user.contactInfo) { return null; }

        return (
            <div className="row">
                <label className="col-sm-2"><FormattedMessage id="users.contactInfo" /></label>
                <div className="col-sm-10">{this.user.contactInfo}</div>
            </div>
        );
    }

    render() {
        if (this.props.loading) {
            return <div className="page users-profile"><Components.Loading /></div>
        } else if (!this.user) {
            console.log(`// missing user (_id/slug: ${this.props.documentId || this.props.slug})`);
            return <div className="page users-profile"><FormattedMessage id="app.404" /></div>
        } else {
            const user = this.user;

            const terms = { view: "userPosts", userId: user._id };

            return (
                <div className="page users-profile">
                    <Components.HeadTags url={Users.getProfileUrl(user, true)} title={Users.getDisplayName(user)} />
                    <h2>{Users.getDisplayName(user)}</h2>
                    <Components.ShowIf check={Users.options.mutations.edit.check} document={user}>
                        <Link to={Users.getEditUrl(user)}><FormattedMessage id="users.edit_account" /></Link>
                    </Components.ShowIf>

                    <hr />

                    {this.renderBio()}
                    {this.renderContactInfo()}

                    <h3><FormattedMessage id="users.posts" /></h3>
                    <Components.PostsList terms={terms} showHeader={false} />
                </div>
            )
        }
    }
}

CustomUsersProfile.propTypes = {
    // document: PropTypes.object.isRequired,
}

CustomUsersProfile.displayName = "CustomUsersProfile";

const options = {
    collection: Users,
    queryName: 'usersSingleQuery',
    fragmentName: 'UsersProfile',
};

// registerComponent('CustomUsersProfile', CustomUsersProfile, withCurrentUser, [withDocument, options]);
replaceComponent('UsersProfile', CustomUsersProfile)