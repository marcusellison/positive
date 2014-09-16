
/*
 * Layout View - Main view container for the Stream and that's the bottom line.
 */

define(['backbone', 'handlebars', 'underscore', 'marionette', 'views/header_view', 'views/stream_view'
    ],

    function(Backbone, Handlebars, _, Marionette, HeaderView, StreamView
    ) {

        'use strict';

        var Layout = Backbone.Marionette.Layout.extend({
            el: '.container',

            regions: {
                stream: "#stream",
                header: "#header"
            },

            initialize: function(options) {
              this.streamItems = options.streamItems;
              this.streamItem = options.streamItem;
              this.showStreamView();
              this.showHeaderView();
            },

            showStreamView: function() {
              this.stream.show(new StreamView({
                  collection: this.streamItems
              }));
            },
            showHeaderView: function() {
              this.header.show(new HeaderView());
            }

        });

        return Layout;

    }
);
