/*
The original Logo components is defined using React's
functional stateless component syntax, so we redefine
it the same way.
*/

import React from 'react';
import {Components, replaceComponent} from 'meteor/vulcan:core';
import {FormattedMessage, intlShape} from "meteor/vulcan:i18n";
import PropTypes from "prop-types";

const CustomPostsNewButton = (props, context) => {
    const size = props.currentUser ? 'lg' : 'sm';
    const button = <Components.Button className="posts-new-button" variant="primary"><Components.Icon name="new"/> <FormattedMessage id="posts.new_post"/></Components.Button>;
    return (
        <Components.ModalTrigger size={size} title={context.intl.formatMessage({ id: 'posts.new_post' })} component={button}>
            <Components.CreatePostFlow />
        </Components.ModalTrigger>
    )
};

CustomPostsNewButton.contextTypes = {
    closeCallback: PropTypes.func,
    intl: intlShape
};

replaceComponent('PostsNewButton', CustomPostsNewButton);