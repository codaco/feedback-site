import { addRoute } from 'meteor/vulcan:core';

addRoute([
  {name:'posts.list',     path: '/',                    componentName: 'PostsHome'}, // index route
  {name:'posts.single',   path:'posts/:_id(/:slug)',    componentName: 'PostsSingle'},
  {name:'users.account',  path:'account',               componentName: 'UsersAccount'},
  {name:'resetPassword',  path:'reset-password/:token', componentName: 'UsersResetPassword'},
  {name:'users.single',   path:'users/:slug',           componentName: 'UsersSingle'},
  {name:'users.edit',     path:'users/:slug/edit',      componentName: 'UsersAccount'},
  {name:'users.list',     path:'users',                 componentName: 'UsersList'},
]);
