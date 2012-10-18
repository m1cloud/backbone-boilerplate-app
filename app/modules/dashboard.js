define([
	'app',
	'modules/widgets'
], function(app, Widgets) {
	var Dashboard = app.module();
	
	// the main view, where widgets are loaded into
	Dashboard.Views.Index = Backbone.View.extend({
		template: 'dashboard/index',
		className: 'dashboard_view',
		beforeRender: function() {
			var self = this;
			
			this.collection.each(function(widget) {
				self.insertView('ul#widget_list', new Widgets.Views[widget.get('template')]({
					tagName: 'li',
					className: widget.get('id'),
					model: widget,
					template: 'widgets/' + widget.get('template')
				}));
			});
		}
	});
	
	return Dashboard;
});
