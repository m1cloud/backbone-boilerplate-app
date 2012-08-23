define([
	'app',
	'backbone',
	'modules/widgets'
], function(app, Backbone, Widgets) {
	var Dashboard = app.module();
	
	Dashboard.Model = Backbone.Model.extend({
		url: 'app_info.json' // this would obviously be a REST endpoint...
	});
	
	// view to show some user info, once logged in..
	Dashboard.Views.Info = Backbone.View.extend({
		template: 'dashboard/app_info',
		serialize: function() { return this.model.toJSON(); }
	})
		
	// the main view, where widgets are loaded into
	Dashboard.Views.Index = Backbone.View.extend({
		template: 'dashboard/index',
		beforeRender: function() {
			var self = this;
			
			
			this.collection.each(function(widget) {
				self.insertView('ul', new Widgets.Views[widget.get('template')]({
					className: widget.get('id'),
					model: widget,
					template: 'widgets/' + widget.get('template')
				}));
			});
		}
	});
	
	return Dashboard;
});
