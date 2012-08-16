define([
	'app',
	'backbone',
	'modules/dashboard',
	'modules/404'
], function(app, Backbone, Dashboard, NotFound) {
	var Router = Backbone.Router.extend({
		routes: {
			'dashboard': 'dashboard',
			'*page': 'index'
		},

		index: function(page) {
			this.layout.setView('#inner_content', new NotFound.Views.Index({ page: page })).render();
		},
		
		dashboard: function() {
			var self = this;
			
			this.tweets.fetch({ 
				success: function(tweets) {
					self.layout.setViews({ '#inner_content': new Dashboard.Views.Index({ collection: tweets }) }).render();
				}
			});
		},

		initialize: function() {
			this.tweets = new Dashboard.Collection();
			
			this.layout = app.useLayout('main');
			this.layout.render();
		}
	});

	return Router;
});