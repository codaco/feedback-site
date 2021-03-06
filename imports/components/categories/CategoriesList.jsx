import { ModalTrigger, Components, registerComponent, withList, Utils } from "meteor/vulcan:core";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Button from 'react-bootstrap/lib/Button';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router'
import Categories from 'meteor/vulcan:categories';
import { withApollo } from 'react-apollo';

class CategoriesList extends PureComponent {

  getCategoryLink(slug) {
    const newQuery = _.clone(this.props.router.location.query);
    newQuery.cat = slug;

    return {
      pathname: '/',
      query: newQuery,
    };
  }

  getNestedCategories() {
    const categories = this.props.results;

    // check if a category is currently active in the route
    const currentCategorySlug = this.props.router.location.query && this.props.router.location.query.cat;
    const currentCategory = Categories.findOneInStore(this.props.client.store, {slug: currentCategorySlug});
    const parentCategories = Categories.getParents(currentCategory, this.props.client.store);

    // decorate categories with active and expanded properties
    const categoriesClone = _.map(categories, category => {
      return {
        ...category, // we don't want to modify the objects we got from props
        active: currentCategory && category.slug === currentCategory.slug,
        expanded: parentCategories && _.contains(_.pluck(parentCategories, 'slug'), category.slug)
      };
    });

    const nestedCategories = Utils.unflatten(categoriesClone, {idProperty: '_id', parentIdProperty: 'parentId'});

    return nestedCategories;
  }


  renderEdit() {


    return (
      <ModalTrigger title="Edit Category" component={<a className="edit-category-link"><Components.Icon name="edit"/></a>}>
        <Components.CategoriesEditForm category={this.props.category}/>
      </ModalTrigger>
    )
  }

  renderEdit(category) {
    return (
      <Components.ShowIf
        check={Categories.options.mutations.edit.check}
        document={category}
        key={`${category._id}.edit`}
      >
        <MenuItem>
          <ModalTrigger
            title="Edit Category"
            component={<span>{`- edit ${category.name}`}</span>}
          >
            <Components.CategoriesEditForm category={category} />
          </ModalTrigger>
        </MenuItem>
      </Components.ShowIf>
    );
  }

  renderCategory(category) {
    return (
      <LinkContainer key={category._id} to={this.getCategoryLink(category.slug)}>
        <MenuItem>
          {category.name}
        </MenuItem>
      </LinkContainer>
    );
  }

  renderCategories() {
    if (this.props.loading) {
      return (<div className="dropdown-item"><MenuItem><Components.Loading /></MenuItem></div>);
    }

    const nestedCategories = this.getNestedCategories();
    if (nestedCategories && nestedCategories.length > 0) {
      let elements = [];
      nestedCategories.forEach((category) => {
        elements.push(this.renderCategory(category));
        elements.push(this.renderEdit(category));
      })
      return elements;
    }

    return null;
  }

  render() {

    const allCategoriesQuery = _.clone(this.props.router.location.query);
    delete allCategoriesQuery.cat;

    return (
      <div>
        <DropdownButton
          bsStyle="default"
          className="categories-list btn-secondary"
          title={<FormattedMessage id="categories"/>}
          id="categories-dropdown"
        >
          <LinkContainer
            active={!this.props.router.location.query.cat}
            to={{ pathname: "/", query: allCategoriesQuery }}
          >
            <MenuItem>
              <FormattedMessage id="categories.all"/>
            </MenuItem>
          </LinkContainer>
          {this.renderCategories()}
          <Components.ShowIf check={Categories.options.mutations.new.check}>
            <MenuItem divider />
          </Components.ShowIf>
          <Components.ShowIf check={Categories.options.mutations.new.check}>
            <MenuItem eventKey="edit">
              <ModalTrigger title={<FormattedMessage id="categories.new"/>} component={<Button bsStyle="primary"><FormattedMessage id="categories.new"/></Button>}>
                <Components.CategoriesNewForm/>
              </ModalTrigger>
            </MenuItem>
          </Components.ShowIf>
        </DropdownButton>

      </div>
    )

  }
}

CategoriesList.propTypes = {
  results: PropTypes.array,
};


const options = {
  collection: Categories,
  queryName: 'categoriesListQuery',
  fragmentName: 'CategoriesList',
  limit: 0,
  pollInterval: 0,
};

registerComponent('CategoriesList', CategoriesList, withRouter, withApollo, [withList, options]);
