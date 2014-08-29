/*
 * Router. Initializes the root-level View(s), and calls the render() method on Sub-View(s).
 */

define(['backbone', 'models/stream_item', 'collections/stream_items', 'views/layout', 'views/post_view'
    ],

    function(Backbone, StreamItemModel, StreamItemsCollection, Layout, PostView) {

        'use strict';

        var MainRouter = Backbone.Router.extend({

            routes: {
                '': 'showStream'
            },

            initialize: function() {
              this.streamItems = new StreamItemsCollection(window.streamItems);
              this.streamItem = new StreamItemModel();

              this.layout = new Layout({
                  streamItems: this.streamItems,
                  streamItem: this.streamItem
              });
               var view = new PostView({
                 collection: this.streamItems
               });
               view.render();
            },

            showStreamView: function() {
                this.layout.showStream();
            },

        });

        return MainRouter;

    }
);
