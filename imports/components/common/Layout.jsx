import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Helmet from 'react-helmet';

const Layout = ({currentUser, children, currentRoute}) =>

  <div className={classNames('wrapper', `wrapper-${currentRoute.name.replace('.', '-')}`)} id="wrapper">

    <Helmet>
      <link name="font-awesome" rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <link href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500,700" rel="stylesheet" />
      <link rel="shortcut icon" type="image/x-icon" href="/img/favicon.ico" />
      <link rel="shortcut icon" type="image/png" href="/img/favicon.png" />
    </Helmet>

    {currentUser ? <Components.UsersProfileCheck currentUser={currentUser} documentId={currentUser._id} /> : null}

    <Components.Header />

    <div className="container">

      <Components.FlashMessages />

      {children}

      <p className="text-center">
        <a href="http://networkcanvas.com" target="_blank">Network Canvas homepage</a>
      </p>
    </div>

  </div>

registerComponent('Layout', Layout, withCurrentUser);
