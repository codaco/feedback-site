Package.describe({
  name: 'network-canvas'
});

Package.onUse(function (api) {

  api.versionsFrom('METEOR@1.0');

  api.use([
    'vulcan:core',
    'vulcan:posts',
    'vulcan:comments',
    'vulcan:voting',
    'vulcan:accounts',
    'vulcan:categories',
    'vulcan:forms',

    'vulcan:base-styles',

    // third-party packages
    'fourseven:scss@4.5.0',
  ])

  api.addFiles('lib/stylesheets/main.scss');

  api.mainModule("lib/server.js", "server");
  api.mainModule("lib/client.js", "client");

})