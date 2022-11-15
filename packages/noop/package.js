Package.describe({
  name: 'noop',
  version: '0.0.1',
  description: 'a noop package to allow conditional imports',
});

Package.onUse(function (api) {
  api.mainModule('noop.js');
});
