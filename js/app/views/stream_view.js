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

            // initialize: function(options) {
            //   this.router = options.router;
            //   this.listenTo(this.collection, "add", this.updateModelNumbers);
            //   this.listenTo(this.collection, "remove", this.updateModelNumbers);
            // }
            // events: {
            //     "click .payment_method": "updatePaymentMethods",
            //     'focus .currency_format': 'triggerCurrencyFormat',
            // }
        });

        return StreamView;

    }
);
