define(['backbone','backbone-relational', 'moment'],

	function(Backbone, Relational, moment) {

		'use strict';

		var StreamItem = Backbone.RelationalModel.extend({
			url: '/createStreamItem'
		});

		return StreamItem;

	}

	);
