Package.describe({
    summary: "Automatically add visitor as anonymous guest with userId",
    version: "0.1.13_1",
    name: "artwells-accounts-guest-custom",
    git: "https://github.com/artwells/meteor-accounts-guest.git"
});

Package.onUse(function (api) {
    api.versionsFrom("METEOR@1.0");
    api.use('vulcan:core')
    api.use(['accounts-base','deps', 'blaze@2.0.4'], 'client');
    api.use(['accounts-base', 'mongo@1.1.0', 'check', 'random'], 'server');
    api.use('accounts-password', 'server', { weak: true });
    api.use('underscore', 'server');
    api.use('brettle:accounts-patch-ui@0.0.1');
    api.use('brettle:accounts-login-state@0.0.1');
    api.use('brettle:accounts-add-service@0.3.0', ['client', 'server'], { weak: true });
    api.use('brettle:accounts-multiple@0.3.0', ['client', 'server'], { weak: true });

    api.mainModule('server.js', 'server');
    api.mainModule('client.js', 'client');

});

Package.onTest(function (api) {
    api.versionsFrom("METEOR@1.0");
    api.use(['accounts-base', 'accounts-password', 'mongo', 'tinytest','deps','ddp'], ['client','server']);
    api.use('artwells:accounts-guest');
    api.add_files('accounts-guest-server-tests.js', 'server');
    api.add_files('accounts-guest-client-tests.js', 'client');
});
