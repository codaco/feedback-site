import { Components, replaceComponent, getRawComponent } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, intlShape } from 'react-intl';

class CustomUsersMenu extends Components.UsersMenu {

    render() {
        // console.log(this.renderButton); <-- exists

        // return this.state.showBanner ? (
        //         <div className="newsletter">
        //             <h4 className="newsletter-tagline">✉️<FormattedMessage id="newsletter.subscribe_prompt"/>✉️</h4>
        //             {this.props.currentUser ? this.renderButton() : this.renderForm()}
        //             <a onClick={this.dismissBanner} className="newsletter-close"><Components.Icon name="close"/></a>
        //         </div>
        //     ) : null;
    }

}

replaceComponent('UsersMenu', CustomUsersMenu);