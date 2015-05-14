Package.describe({
  name: 'nicolaslopezj:orion-sites-files',
  summary: 'Create templates that you can override in meteor',
  version: '1.0.0',
  git: 'https://github.com/nicolaslopezj/files-service-orion-provider'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'meteor-platform',
    'http',
    'nicolaslopezj:roles@1.0.5',
    'orionjs:filesystem@1.0.2'
    ]);

  api.addFiles('roles.js');
  api.addFiles('server.js', 'server');
  api.addFiles('provider.js', 'client');
});

Package.onTest(function(api) {
});
