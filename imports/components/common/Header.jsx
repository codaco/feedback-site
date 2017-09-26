import React from 'react';
import PropTypes from 'prop-types';
import { withCurrentUser, getSetting, Components, registerComponent } from 'meteor/vulcan:core';

const Header = (props, context) => {

  const logoUrl = getSetting("logoUrl");
  const siteTitle = getSetting("title", "My App");

  return (
    <nav className="navbar navbar-default navbar-static-top">

      <div className="container">

        <div className="navbar-header">
          <a className="navbar-brand" href="/">{siteTitle}</a>

        </div>

        <div className="nav navbar-nav navbar-right">
          {!!props.currentUser ? <Components.UsersMenu/> : <Components.UsersAccountMenu/>}
        </div>

      </div>
    </nav>
  )
}

Header.displayName = "Header";

Header.propTypes = {
  currentUser: PropTypes.object,
};

registerComponent('Header', Header, withCurrentUser);
