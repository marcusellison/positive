/*
 * PostView
 * A unit of positivity
 */

define(['backbone', 'handlebars', 'underscore', 'jquery', 'moment', 'hbs!templates/post_tpl'],

    function(Backbone, Handlebars, _, $, moment, streamItemTemplate) {

        'use strict';

        var PostView = Backbone.Marionette.ItemView.extend({

          el: '#post',

          template: streamItemTemplate,

          initialize: function(options) {
            this.collection = options.collection;
          },

          events: {
            "click .add_stream_item": "addStreamItem",
            "keypress #post_message": "addStreamItemEnter"
          },

          addStreamItemEnter: function(event) {

            if (event.keyCode == 13) {
              var date = moment().format('h:mm a'),
                  location = 'New York City',
                  vibes = 1;

              this.collection.add({
                  text: event.target.value,
                  date: date,
                  location: location,
                  vibes: vibes
              },
                {at: 0},
                {merge: true}
              );
              event.target.value = null;
            }

          },

          addStreamItem: function(event) {
            event.preventDefault();

            var $event = $(event);
            var date = moment().format('h:mm a');
            var location = 'New York City';
            var $text = $('#post_message').val();
            var vibes = 1;

            this.collection.add({
              date: date,
              text: $text,
              location: location,
              vibes: vibes
            }, { at: 0, }, {merge: true});

            $('#post_message').val('');

          }

        });

        return PostView;

    }
);
