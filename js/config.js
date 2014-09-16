/**
/**
 *
 * RequireJS file paths and shim config.
 *
 *
 * The build will inline common dependencies into this file.
 * File paths will be used for other module packages too, as defined in build.js.
 *
 *
 * More info            https://github.com/jrburke/r.js/blob/master/build/example.build.js
 *                      https://github.com/ryanfitzer/Example-RequireJS-jQuery-Project
 *                      https://github.com/tbranyen/backbone-boilerplate
 *                      https://github.com/requirejs/example-multipage-shim
 *
 * @author Aki Karkkainen - adapted from https://github.com/requirejs/example-multipage-shim
 * @url https://github.com/akikoo/grunt-frontend-workflow
 * Twitter: http://twitter.com/akikoo
 *
 */

require.config({

    paths: {

        // Core libraries.
        jquery: 'lib/jquery/jquery',
        'jquery-ui': 'lib/jquery-ui/ui/jquery-ui',
        underscore: 'lib/underscore/underscore',
        backbone: 'lib/backbone/backbone',
        marionette: 'lib/backbone.marionette/lib/backbone.marionette',
        modernizr: 'lib/modernizr/modernizr',
        'backbone-relational': 'lib/backbone-relational/backbone-relational',
        eq: 'lib/eq.js/dist/eq.min',

        //plugins - bower
        text: 'lib/requirejs-text/text',
        moment: 'lib/momentjs/moment',
        "intro": 'lib/intro.js/intro',

        // Templating.
        handlebars: 'lib/handlebars/handlebars',
        'i18nprecompile': 'lib/hbs/hbs/i18nprecompile',
        'json2': 'lib/hbs/hbs/json2',
        hbs: 'lib/hbs/hbs',

        // App folders.
        collections: 'app/collections',
        models: 'app/models',
        routers: 'app/routers',
        templates: 'app/templates',
        views: 'app/views'
    },

    // Dependencies for scripts that are not wrapped as AMD modules.
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        marionette: {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Marionette'
        },
        handlebars: {
            exports: 'Handlebars'
        },
        "jquery-ui": {
            deps: ['jquery']
        },
        'backbone-relational': {
            deps: ['backbone']
        },
        "intro": {
            exports: ['introJs']
        },
    },
    hbs: {
        templateExtension: "html",
        disableI18n: true
    }
});
