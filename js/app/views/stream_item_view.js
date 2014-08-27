/*
 * Stream Item View
 * A unit of positivity
 */

define(['backbone', 'handlebars', 'underscore', 'hbs!templates/stream_item_tpl'],

    function(Backbone, Handlebars, _, streamItemTemplate) {

        'use strict';

        var StreamItemView = Backbone.Marionette.ItemView.extend({

            template: streamItemTemplate,

            initialize: function(options) {
                this.listenTo(this.model, "add", this.render);
                this.listenTo(this.model, "remove", this.render);
                this.listenTo(this.model, "change", this.render);
            }

        });

        return StreamItemView;

    }
);
