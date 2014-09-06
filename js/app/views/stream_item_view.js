/*
 * Stream Item View
 * A unit of positivity
 */

define(['backbone', 'handlebars', 'underscore', 'hbs!templates/stream_item_tpl'],

    function(Backbone, Handlebars, _, streamItemTemplate) {

        'use strict';

        var StreamItemView = Backbone.Marionette.ItemView.extend({

            template: streamItemTemplate,

            initialize: function(options) {
              this.listenTo(this.model, "change", this.render);
            },

            events: {
              "click .remove_stream_item": "removeStreamItem",
              "click .like-icon": "addVibe"
            },

            removeStreamItem: function(event) {
              event.preventDefault();
              this.remove();
            },

            addVibe: function(event) {
              var src = "images/pp_icon_active_01.png";

              event.target.src = src;
              var vibes = this.incrementVibes();

              this.model.set({
                vibes: vibes
              });
            },

            incrementVibes: function(event) {
              var vibes;
              vibes = this.model.get('vibes');
              return vibes += 1;
            },

            onBeforeDestroy: function(){
              this.$el.fadeOut();
            }

        });

        return StreamItemView;

    }
);
