/*
 * Router. Initializes the root-level View(s), and calls the render() method on Sub-View(s).
 */

define(['backbone', 'models/stream_item', 'collections/stream_items', 'views/layout', 'views/post_view', 'views/stream_header_view'
    ],

    function(Backbone, StreamItemModel, StreamItemsCollection, Layout, PostView, StreamHeaderView) {

        'use strict';

        var MainRouter = Backbone.Router.extend({

            routes: {
                '': 'showStream'
            },

            initialize: function() {
              this.streamItems = new StreamItemsCollection(window.streamItems);
              this.streamItems.fetch();
              this.streamItem = "new StreamItemModel();" //fast comment out

              this.layout = new Layout({
                  streamItems: this.streamItems,
                  streamItem: this.streamItem
              });

              var postView = new PostView({
                collection: this.streamItems
              });
              postView.render();

              var streamHeaderView = new StreamHeaderView({
                collection: this.streamItems
              });
              streamHeaderView.render();
            },

            showStreamView: function() {
                this.layout.showStream();
            },

        });

        return MainRouter;

    }
);
