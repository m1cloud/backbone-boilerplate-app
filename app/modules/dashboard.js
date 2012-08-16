define([
	'app',
	'backbone'
], function(app, Backbone) {
	var Dashboard = app.module();
	
	// widget collection
	Dashboard.Collection = Backbone.Collection.extend({
		url: 'http://search.twitter.com/search.json?q=backbonejs&page=1&callback=?',
		parse: function(resp, xhr) { return resp.results; }
	});
	
	Dashboard.Views.Item = Backbone.View.extend({
		template: 'dashboard/tweet',
		tagName: 'li',
		serialize: function() { return this.model.toJSON(); }
	});
		
	// the main view, where widgets are loaded into
	Dashboard.Views.Index = Backbone.View.extend({
		template: 'dashboard/index',
		beforeRender: function() {
			console.log('Dashboard beforeRender');
			var self = this;

			this.collection.each(function(tweet) {
				self.insertView('ul', new Dashboard.Views.Item({ model: tweet }));
			});
		},
		afterRender: function() { console.log('Dashboard afterRender'); }
	});
	
	return Dashboard;
});