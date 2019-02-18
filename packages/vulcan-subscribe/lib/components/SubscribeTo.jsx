import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'meteor/vulcan:i18n';
import { compose, graphql } from 'react-apollo';
import classNames from 'classnames';
import gql from 'graphql-tag';
import Users from 'meteor/vulcan:users';
import { withCurrentUser, withMessages, registerComponent, Utils } from 'meteor/vulcan:core';

// boolean -> unsubscribe || subscribe
const getSubscribeAction = subscribed => subscribed ? 'unsubscribe' : 'subscribe'

class SubscribeToActionHandler extends PureComponent {

    constructor(props, context) {
        super(props, context);

        this.onSubscribe = this.onSubscribe.bind(this);

        this.state = {
            subscribed: !!Users.isSubscribedTo(props.currentUser, props.document, props.documentType),
        };
    }

    async onSubscribe(e) {
        try {
            e.preventDefault();

            const { document, documentType } = this.props;
            const action = getSubscribeAction(this.state.subscribed);

            // todo: change the mutation to auto-update the user in the store
            await this.setState(prevState => ({subscribed: !prevState.subscribed}));

            // mutation name will be for example postsSubscribe
            await this.props[`${documentType + Utils.capitalize(action)}`]({documentId: document._id});

            this.props.flash(this.context.intl.formatMessage(
                { id: `${documentType}.${action}d`, properties: {name: document.name || document.title || document.displayName},
                        type: 'success'
                })
            );


        } catch(error) {
            console.log(error);
            this.props.flash({
                id: `subscribe.error_${error.name}`,
                message: error.message,
                type: 'error',
            });
        }
    }

    render() {
        const { currentUser, document, documentType } = this.props;
        const { subscribed } = this.state;

        const action = `${documentType}.${getSubscribeAction(subscribed)}`;

        // can't subscribe to yourself
        if (!currentUser || !document || (documentType === 'users' && document._id === currentUser._id)) {
            return null;
        }

        const className = classNames(this.props.className, { 'subscribed': subscribed });

        return Users.canDo(currentUser, action) ? <button className={className} onClick={this.onSubscribe}><FormattedMessage id={action} /></button> : null;
    }

}

SubscribeToActionHandler.propTypes = {
    document: PropTypes.object.isRequired,
    className: PropTypes.string,
    currentUser: PropTypes.object,
};

SubscribeToActionHandler.contextTypes = {
    intl: intlShape
};

const subscribeMutationContainer = ({documentType, actionName}) => graphql(gql`
  mutation ${documentType + actionName}($documentId: String) {
    ${documentType + actionName}(documentId: $documentId) {
      _id
      subscribedItems
    }
  }
`, {
    props: ({ownProps, mutate}) => ({
        [documentType + actionName]: vars => {
            return mutate({
                variables: vars,
            });
        },
    }),
});

const SubscribeTo = props => {

    const documentType = Utils.getCollectionNameFromTypename(props.document.__typename);

    const withSubscribeMutations = ['Subscribe', 'Unsubscribe'].map(actionName => subscribeMutationContainer({documentType, actionName}));

    const EnhancedHandler = compose(...withSubscribeMutations)(SubscribeToActionHandler);

    return <EnhancedHandler {...props} documentType={documentType} />;
};

registerComponent('SubscribeTo', SubscribeTo, withCurrentUser, withMessages);
