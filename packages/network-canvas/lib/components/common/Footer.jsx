import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Footer = props => {
  return (
    <div className="footer"><a href="http://networkcanvas.com" target="_blank">Network Canvas homepage</a></div>
  )
}

Footer.displayName = "Footer";

registerComponent('Footer', Footer);