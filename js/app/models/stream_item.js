define(['backbone','backbone-relational', 'moment'],

	function(Backbone, Relational, moment) {

		'use strict';

		var globalCounter = 1;

		var StreamItem = Backbone.RelationalModel.extend({
			urlRoot: '/streamItem',
			idAttribute: 'ID'
		});

		return StreamItem;

	}

	);
