/*
 * PostView
 * A unit of positivity
 */

define(['backbone', 'handlebars', 'underscore', 'jquery', 'moment', 'hbs!templates/stream_header_tpl'],

    function(Backbone, Handlebars, _, $, moment, streamHeaderTemplate) {

        'use strict';

        var PostView = Backbone.Marionette.ItemView.extend({

          el: '.stream-header',

          template: streamHeaderTemplate,

          serializeData: function(){
            return {
              "total_posts": this.totalPosts
            }
          },

          initialize: function(options) {
            this.collection = options.collection;
            this.listenTo(this.collection, "add", this.updateVibes);
            this.updateVibes();
          },

          updateVibes: function() {
            this.totalPosts = (this.collection.length);
            this.render();
          }

        });

        return PostView;

    }
);
