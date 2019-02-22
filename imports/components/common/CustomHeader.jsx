import React from 'react';
import PropTypes from 'prop-types';
import { withCurrentUser, getSetting, Components, replaceComponent } from 'meteor/vulcan:core';
import { Posts } from 'meteor/example-forum';

const CustomHeader = (props) => {

    const logoUrl = getSetting('logoUrl');
    const siteTitle = getSetting('title', 'My App');
    const tagline = getSetting('tagline');

    return (
        <div className="header-wrapper">

            <header className="header">

                <div className="logo">
                    <Components.Logo logoUrl={logoUrl} siteTitle={siteTitle} />
                    {tagline ? <h2 className="tagline">{tagline}</h2> : "" }
                </div>

                <div className="nav">

                    <div className="nav-user">
                        {!!props.currentUser ? <Components.UsersMenu/> : <Components.UsersAccountMenu/>}
                    </div>

                </div>

            </header>
        </div>
    )
}

CustomHeader.displayName = "Header";

CustomHeader.propTypes = {
    currentUser: PropTypes.object,
};

replaceComponent('Header', CustomHeader, withCurrentUser);
