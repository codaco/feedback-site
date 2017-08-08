import { Components } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';

const Home = (props, context) => {
  const terms = _.isEmpty(props.location && props.location.query) ? {view: 'top'}: props.location.query;

  return <Components.PostsList terms={terms} />
};

Home.displayName = "Home";

export default Home;
