import { addRoute } from 'meteor/vulcan:core';

import PostsHome from './pages/PostsHome';
import PostsSingle from './pages/PostsSingle';
import UsersAccount from './pages/UsersAccount';
import UsersSingle from './pages/UsersSingle';

addRoute([
  {name:'posts.list',     path: '/',                    component: PostsHome},
  {name:'posts.single',   path:'posts/:_id(/:slug)',    component: PostsSingle},
  {name:'users.account',  path:'account',               component: UsersAccount},
  {name:'resetPassword',  path:'reset-password/:token', componentName: 'AccountsResetPassword'},
  {name:'users.single',   path:'users/:slug',           component: UsersSingle},
  {name:'users.edit',     path:'users/:slug/edit',      component: UsersAccount},
]);
