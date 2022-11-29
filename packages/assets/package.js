Package.describe({
  name: 'assets',
  version: '0.0.1',
  description: 'a simple assets package',
});

Package.onUse(function (api) {
  api.mainModule('server.js', 'server');
  api.mainModule('client.js', 'client');
});
