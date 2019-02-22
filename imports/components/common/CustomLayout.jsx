import { Components, replaceComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Helmet from 'react-helmet';

const CustomLayout = ({currentUser, children, currentRoute}) =>

    <div id="wrapper">
        <Helmet>
            <link name="bootstrap" rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"/>
            <link name="font-awesome" rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <link rel="shortcut icon" type="image/x-icon" href="/img/favicon.ico" />
            <link rel="shortcut icon" type="image/png" href="/img/favicon.png" />
        </Helmet>

        {currentUser ? <Components.UsersProfileCheck currentUser={currentUser} documentId={currentUser._id} /> : null}

        <Components.Header />

        <div className="container">

            <Components.FlashMessages />

            {children}

            <Components.Footer/>
        </div>

    </div>

replaceComponent('Layout', CustomLayout);
