import { Components, registerComponent, withCurrentUser, withMessages } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { STATES } from 'meteor/vulcan:accounts';

class UsersEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.terms && props.terms.slug
    }
  }

  componentDidMount() {
    if (!this.props.terms.slug) {
      this.setState({
        username: Users.getUserNameById(this.props.terms.documentId)
      });
    }
  }

  render() {
    return (
      <Components.ShowIf
        check={Users.options.mutations.edit.check}
        document={this.props.terms.documentId ? { _id: this.props.terms.documentId } : { slug: this.props.terms.slug }}
        failureComponent={<FormattedMessage id="app.noPermission" />}
      >
        <div className="page users-edit-form">
          <h2 className="page-title users-edit-form-title"><FormattedMessage id="users.edit_account" /></h2>

          <div className="change-password-link">
            <Components.ModalTrigger size="small" title={this.context.intl.formatMessage({ id: "accounts.change_password" })} component={<a href="#"><FormattedMessage id="accounts.change_password" /></a>}>
              <Components.AccountsLoginForm formState={STATES.PASSWORD_CHANGE} />
            </Components.ModalTrigger>
          </div>

          <div className="form-group row">
            <label className="control-label col-sm-3">Username</label>
            <div className="col-sm-9">
              {this.state.username}
            </div>
          </div>

          <Components.SmartForm
            collection={Users}
            {...this.props.terms}
            successCallback={user => {
              this.props.flash(this.context.intl.formatMessage({ id: 'users.edit_success' }, { name: Users.getDisplayName(user) }), 'success')
            }}
            showRemove={true}
          />
        </div>
      </Components.ShowIf>
    );
  }

};


UsersEditForm.propTypes = {
  terms: PropTypes.object, // a user is defined by its unique _id or its unique slug
};

UsersEditForm.contextTypes = {
  intl: intlShape
};

UsersEditForm.displayName = 'UsersEditForm';

registerComponent('UsersEditForm', UsersEditForm, withMessages, withCurrentUser);
