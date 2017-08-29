Package.describe({
  name: "networkcanvas-styles",
  summary: "styles for networkcanvas feedback site",
  version: '1.7.0',
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'vulcan:core@1.7.0',
    'fourseven:scss@4.5.0',
  ]);

  api.addFiles([
    'lib/stylesheets/main.scss'
  ], ['client']);

});
