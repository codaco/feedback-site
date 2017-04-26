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

    // Handle SCSS assets
    'fourseven:scss',
  ])

  api.mainModule("lib/server/index.js", "server");
  api.mainModule("lib/client/index.js", "client");

})