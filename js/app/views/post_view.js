/*
 * PostView
 * A unit of positivity
 */

define(['backbone', 'handlebars', 'underscore', 'jquery', 'moment', 'eq', 'hbs!templates/post_tpl'],

    function(Backbone, Handlebars, _, $, moment, eqjs, streamItemTemplate) {

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
              var time = moment().format('h:mm a'),
                  location = this.country,
                  vibes = 1;

              this.collection.create({
                  Text: event.target.value,
                  Time: time,
                  Location: location,
                  Vibes: vibes
              },
                {at: 0},
                {merge: true}
              );
              event.target.value = null;
            }

          },

          onRender: function() {
            console.log(this.el);
            eqjs.query(this.el);
          },

          addStreamItem: function(event) {
            event.preventDefault();


            var $event = $(event);
            var time = moment().format('h:mm a');
            var location = this.country;
            var $text = $('#post_message').val();
            var vibes = 1;

            this.collection.create({
              Time: time,
              Text: $text,
              Location: location,
              Vibes: vibes
            }, { at: 0, }, {merge: true});

            console.log(this.model);

            $('#post_message').val('');

          },

          getLocation: function() {
            var that = this;

            $.ajax( {
              url: '//freegeoip.net/json/',
              type: 'POST',
              dataType: 'jsonp',
              success: function(location) {
                var country = location.country_code;
                that.country = country;
              }
            } );
          }

        });

        return PostView;

    }
);
