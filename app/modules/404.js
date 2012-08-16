define([
	'app'
], function(app) {
	var not_found = app.module();
	
	not_found.Views.Index = Backbone.View.extend({
		template: '404/index',
		serialize: function() { return { page: this.options.page }; },
		afterRender: function() { console.log('404 afterRender'); }
	});
	
	return not_found;
});
