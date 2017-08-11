import { addRoute } from 'meteor/vulcan:core';

import PostsHome from './pages/PostsHome';
import PostsSingle from './pages/PostsSingle';
import UsersAccount from './pages/UsersAccount';
import UsersList from './pages/UsersList';
import UsersResetPassword from './pages/UsersResetPassword';
import UsersSingle from './pages/UsersSingle';

addRoute([
  {name:'posts.list',     path: '/',                    component: PostsHome},
  {name:'posts.single',   path:'posts/:_id(/:slug)',    component: PostsSingle},
  {name:'users.account',  path:'account',               component: UsersAccount},
  {name:'resetPassword',  path:'reset-password/:token', component: UsersResetPassword},
  {name:'users.single',   path:'users/:slug',           component: UsersSingle},
  {name:'users.edit',     path:'users/:slug/edit',      component: UsersAccount},
  {name:'users.list',     path:'users',                 component: UsersList},
]);
