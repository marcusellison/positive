/*
 * Header View
 */

define(['backbone', 'handlebars', 'underscore', 'jquery', 'marionette',
        'hbs!templates/header_tpl',
    ],

    function(Backbone, Handlebars, _, $, Marionette, HeaderTemplate) {

        'use strict';

        var StreamView = Backbone.Marionette.CompositeView.extend({

            template: HeaderTemplate,

            // initialize: function() {
            //   console.log("header view");
            // },

             events: {
                "click #mobile_post_icon": "showMobilePost"
             },

             showMobilePost: function(event) {
               event.preventDefault();
               var $post = $('#post');
               $post.toggle();
             }

        });

        return StreamView;

    }
);
