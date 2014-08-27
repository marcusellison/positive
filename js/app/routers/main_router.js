/*
 * Router. Initializes the root-level View(s), and calls the render() method on Sub-View(s).
 */

define(['backbone', 'models/stream_item', 'collections/stream_items', 'views/layout'
    ],

    function(Backbone, StreamItemModel, StreamItemsCollection, Layout) {

        'use strict';

        var MainRouter = Backbone.Router.extend({

            routes: {
                '': 'showStream'
            },

            initialize: function() {
                this.streamItem = new StreamItemModel(window.streamItem);
                this.streamItems = new StreamItemsCollection(window.streamItems);

                var item = new StreamItemModel({
                  date: "somedate",
                  text: "Some really awesome text"
                });

                this.streamItems.add(item);

                this.layout = new Layout({
                    streamItem: this.streamItem,
                    streamItems: this.streamItems
                });
            },

            showStreamView: function() {
                this.layout.showStream();
            },

        });

        return MainRouter;

    }
);
