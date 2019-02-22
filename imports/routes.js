import { addRoute } from 'meteor/vulcan:core';

import PostsHome from './pages/PostsHome';
import PostsSingle from './pages/PostsSingle';
import UsersAccount from './pages/UsersAccount';
import UsersSingle from './pages/UsersSingle';
import ForgotPassword from './pages/ForgotPassword';

addRoute([
  {name:'posts.list',     path: '/',                    component: PostsHome},
  {name:'posts.single',   path:'posts/:_id(/:slug)',    component: PostsSingle},
  {name:'users.account',  path:'account',               component: UsersAccount},
  // {name:'resetPassword',  path:'reset-password/:token', componentName: 'AccountsResetPassword'},
  {name:'forgotPassword', path:'reset-password',        component: ForgotPassword},
  // TODO: what should the /admin page look like (admin/users and admin/categories are built-in)?
  // {name:'users.admin',    path:'admin',                 component: UsersAccount},
  {name:'users.single',   path:'users/:slug',           component: UsersSingle},
  {name:'users.edit',     path:'users/:slug/edit',      component: UsersAccount},
]);
