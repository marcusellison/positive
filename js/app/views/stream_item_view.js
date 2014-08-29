/*
 * Stream Item View
 * A unit of positivity
 */

define(['backbone', 'handlebars', 'underscore', 'hbs!templates/stream_item_tpl'],

    function(Backbone, Handlebars, _, streamItemTemplate) {

        'use strict';

        var StreamItemView = Backbone.Marionette.ItemView.extend({

            template: streamItemTemplate,

            //  initialize: function(options) {
            //  },

            events: {
              "click .remove_stream_item": "removeStreamItem"
            },

            removeStreamItem: function(event) {
              event.preventDefault();
              this.remove();
            }

        });

        return StreamItemView;

    }
);
