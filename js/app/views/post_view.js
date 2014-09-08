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
            this.location = this.getLocation();
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

              this.collection.create({
                  Text: event.target.value,
                  Date: date,
                  Location: location,
                  Vibes: vibes
              },
                {at: 0},
                {merge: true}
              );
              event.target.value = null;
            }

          },

          addStreamItem: function(event) {
            event.preventDefault();

            console.log(this.location);

            var $event = $(event);
            var date = moment().format('h:mm a');
            var location = "New York City";
            var $text = $('#post_message').val();
            var vibes = 1;

            this.collection.create({
              date: date,
              text: $text,
              location: location,
              vibes: vibes
            }, { at: 0, }, {merge: true});

            $('#post_message').val('');

            var streamItem = this.collection.get();

            console.log("stream item:" + streamItem);

            this.collection.fetch();

          },

          getLocation: function() {
            $.ajax( {
              url: '//freegeoip.net/json/',
              type: 'POST',
              dataType: 'jsonp',
              success: function(location) {
                console.log(location.country_code);
                var country = location.country_code;
                console.log(country);
                return country;
              }
            } );
          }

        });

        return PostView;

    }
);
