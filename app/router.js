define([
	'app',
	'backbone',
	'modules/dashboard',
	'modules/404',
	'modules/widgets'
], function(app, Backbone, Dashboard, NotFound, Widgets) {
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
			
			this.widgets.fetch({
				success: function(widgets) {
					self.layout.setView('#inner_content', new Dashboard.Views.Index({ collection: widgets })).render();
				}
			});
		},

		initialize: function() {
			var self = this;
			
			this.layout = app.useLayout('main');
			
			this.widgets = new Widgets.Collection();
			this.app_model = new Dashboard.Model(app.app_model); // bootstrapped!
			
			this.layout.setViews({
				'#info_container': new Dashboard.Views.Info({model: this.app_model})
			}).render();
		}
	});

	return Router;
});