/*
 * Stream Items Collection.
 */

define(['backbone', 'models/stream_item'],

    function(Backbone, Model) {

        'use strict';

        var Collection = Backbone.Collection.extend({

            model: Model
            // save: function(data, options) {
            //     $.ajax({
            //         type: "POST",
            //         url: "/agreements/v/" + this.versionID + "/tasks",
            //         contentType: "application/json",
            //         dataType: "json",
            //         data: JSON.stringify(this.toJSON()),
            //         success: _.bind(function(response) {
            //             this.set(response);
            //             if (_.isFunction(options.success)) options.success();
            //         }, this)
            //     });
            // },
            // createStreamItem: function(reqData, options) {
            //     $.ajax({
            //         type: "POST",
            //         url: "/user",
            //         contentType: "application/json",
            //         dataType: "json",
            //         data: JSON.stringify(_.extend(this.toJSON(), reqData)),
            //         success: _.bind(function(response) {
            //             this.set(response);
            //             if (_.isFunction(options["success"])) options.success(this, response);
            //         }, this),
            //         error: _.bind(function(response) {
            //             if (_.isFunction(options["error"])) options.error(this, response);
            //         }, this)
            //     });
            // },
            // set: function(key, value, options) {
            //     //amount has to be a float or integer. Backend won't accept number as string.
            //     if (typeof key === 'object') {
            //         if (_.has(key, "amountDue")) {
            //             key["amountDue"] = parseFloat(key["amountDue"]);
            //         }
            //         if (_.has(key, "hours")) {
            //             key["hours"] = parseFloat(key["hours"]);
            //         }
            //         if (_.has(key, "rate")) {
            //             key["rate"] = parseFloat(key["rate"]);
            //         }
            //
            //     } else if (key === 'amountDue') {
            //         value = parseFloat(value);
            //     } else if (key === 'hours') {
            //         value = parseFloat(value);
            //     } else if (key === 'rate') {
            //         value = parseFloat(value);
            //     }
            //     Backbone.RelationalModel.prototype.set.apply(this, [key, value, options]);
            //     return this;
            // }

        });

        return Collection;

    }

);
