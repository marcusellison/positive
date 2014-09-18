/*
 * Stream Item View
 * A unit of positivity
 */

define(['backbone', 'handlebars', 'moment', 'underscore', 'hbs!templates/stream_item_tpl'],

    function(Backbone, Handlebars, moment, _, streamItemTemplate) {

        'use strict';

        var StreamItemView = Backbone.Marionette.ItemView.extend({

            template: streamItemTemplate,

            initialize: function(options) {
              this.listenTo(this.model, "change", this.update);
            },

            // serializeData: function(){
            //   return {
            //     "time": this.time
            //   }
            // },


            events: {
              "click .remove_stream_item": "removeStreamItem",
              "click .like-icon": "addVibe"
            },

            removeStreamItem: function(event) {
              event.preventDefault();

              var id = this.model.get("ID");

              this.model.destroy({ id: id }, {
                success: function(model, response) {
                },
                error: function(model, response) {
                }
              });
            },

            addVibe: function(event) {
              var src = "images/pp_icon_active_01.png";

              // if the like icon has an active image
              var $icon = this.$('.like-icon');
              if ($icon.attr('src') === 'images/pp_icon_active_01.png') {
                return
              }

              event.target.src = src;

              var vibes = this.incrementVibes(vibes);

              this.model.set({
                Vibes: vibes
              });

              this.model.save({}, {
                success: function(model, response) {
                },
                error: function(model, response) {
                }
              });
            },

            incrementVibes: function() {
              var vibes = this.model.get('Vibes');
              return vibes += 1;
            },

            onBeforeDestroy: function(){
              this.$el.fadeOut();
            },

            update: function() {
              // re-render
              this.render();
              // change the like-icon color to active after render
              var $icon = this.$('.like-icon');
              $icon.attr('src', 'images/pp_icon_active_01.png');
            }

        });

        return StreamItemView;

    }
);
