import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'meteor/vulcan:i18n';
import { Components, registerComponent, withMessages } from 'meteor/vulcan:core';
import { getFragment } from 'meteor/vulcan:lib';
import { Categories } from "meteor/example-forum";

const CategoriesNewForm = (props, context) => {

  return (
    <div className="categories-new-form">
      <Components.SmartForm 
        collection={Categories}
        mutationFragment={getFragment('CategoriesList')}
        successCallback={category => {
          props.closeModal();
          props.flash(context.intl.formatMessage({id: 'categories.new_success'}, {name: category.name}), "success");
        }}
      />
    </div>
  )
}

CategoriesNewForm.displayName = "CategoriesNewForm";

CategoriesNewForm.propTypes = {
  closeCallback: PropTypes.func,
  flash: PropTypes.func,
};

CategoriesNewForm.contextTypes = {
  intl: intlShape,
};

registerComponent('CategoriesNewForm', CategoriesNewForm, withMessages);
