/*
 * Initialize Main App.
 *
 * A require.config here will be ignored in r.js optimizer
 *
 */

define(function (require) {

  'use strict';

  var MainRouter = require('app/routers/main_router');

  $(function () {

    // Initialize the application router.
    var Main = new MainRouter();

    Backbone.history.start({
      pushState: false
    });

  });

});
