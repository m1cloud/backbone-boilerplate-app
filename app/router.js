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
			this.appModel = new Dashboard.Model();
			
			this.appModel.fetch({ 
				success: function(app_model) {
					self.layout.setViews({
						'#info_container': new Dashboard.Views.Info({model: app_model})
					}).render();
				}
			});
		}
	});

	return Router;
});