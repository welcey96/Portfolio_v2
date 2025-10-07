'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    tests: false,
    fingerprint: {
      exclude: ['assets'],
    },
  });

  return app.toTree();
};
