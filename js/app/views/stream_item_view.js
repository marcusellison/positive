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

              var id = this.model.get("ID");
              console.log(id);

              this.model.destroy({ id: id }, {
                success: function(model, response) {
                  console.log(model);
                  console.log(response);
                },
                error: function(model, response) {
                  console.log(model);
                  console.log(response);
                }
              });
              console.log("delete request sent");
            },

            addVibe: function(event) {
              var src = "images/pp_icon_active_01.png";

              event.target.src = src;


              var vibes = this.incrementVibes(vibes);

              this.model.set({
                Vibes: vibes
              });

              this.model.save({}, {
                success: function(model, response) {
                  console.log("update request received");
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
            }

        });

        return StreamItemView;

    }
);
