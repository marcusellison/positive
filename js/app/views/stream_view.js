/*
 * Payment Schedule View - in Create Agreement
 * Composite view for payments collection
 */

define(['backbone', 'handlebars', 'underscore', 'marionette',
        'hbs!templates/stream_tpl', 'views/stream_item_view',
    ],

    function(Backbone, Handlebars, _, Marionette, StreamTemplate, StreamItem) {

        'use strict';

        var StreamView = Backbone.Marionette.CompositeView.extend({

            template: StreamTemplate,

            itemView: StreamItem,

            // attach the composite view's render method to the collection's add event
            // and override the addChildView to nothing.
            // prevents the collection from rendering the child on initialize, while binding render to the add of the collection
            addChildView: function(){},
              collectionEvents: {
                'add': 'render'
            },

            initialize: function(options) {
              // this.router = options.router;
            },
            // events: {
            //     "click .payment_method": "updatePaymentMethods",
            //     'focus .currency_format': 'triggerCurrencyFormat',
            // }
        });

        return StreamView;

    }
);
