Package.describe({
  name: "vulcan:notifications",
  summary: "Vulcan notifications package",
  version: '1.7.0',
  git: "https://github.com/VulcanJS/Vulcan.git"
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'vulcan:core',
    'vulcan:email',
  ]);

  api.mainModule('lib/modules.js', ['client', 'server']);

});
