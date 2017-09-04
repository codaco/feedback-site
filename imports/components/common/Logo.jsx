import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { IndexLink } from 'react-router';

const Logo = ({logoUrl, siteTitle}) => {
  if (logoUrl) {
    return (
      <a className="logo-image ">
        <IndexLink to={{pathname: "/"}}>
          <img src={logoUrl} alt={siteTitle} />
        </IndexLink>
      </a>
    )
  } else {
    return (
      <h1 className="logo-text">
        <IndexLink to={{pathname: "/"}}>{siteTitle}</IndexLink>
      </h1>
    )
  }
}

Logo.displayName = "Logo";

registerComponent('Logo', Logo);
