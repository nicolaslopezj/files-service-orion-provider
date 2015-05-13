Package.describe({
  name: 'nicolaslopezj:orion-sites-files',
  summary: 'Create templates that you can override in meteor',
  version: '1.0.0',
  git: 'https://github.com/nicolaslopezj/reactive-templates'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'meteor-platform',
    'http',
    'nicolaslopezj:roles',
    'orionjs:filesystem'
    ]);

  api.addFiles('roles.js');
  api.addFiles('server.js', 'server');
  api.addFiles('provider.js', 'client');

  api.export('ReactiveTemplates');
});

Package.onTest(function(api) {
});
