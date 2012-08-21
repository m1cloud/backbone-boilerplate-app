define([
	'app'
], function(app) {
	var Widgets = app.module();
	
	// widget model
	Widgets.Model = Backbone.Model.extend();
	
	// widget collection
	Widgets.Collection = Backbone.Collection.extend({
		model: Widgets.Model,
		url: 'app_widgets.json' // this would obviously be a REST endpoint...
	});
	
	Widgets.Views.widget_1 = Backbone.View.extend({
		serialize: function() { return this.model.toJSON(); },
		afterRender: function() { console.log('widget_1 afterRender'); }
	});	
	
	Widgets.Views.widget_2 = Backbone.View.extend({
		serialize: function() { return this.model.toJSON(); },
		afterRender: function() { console.log('widget_2 afterRender'); }
	});	
	
	Widgets.Views.widget_3 = Backbone.View.extend({
		serialize: function() { return this.model.toJSON(); },
		afterRender: function() { console.log('widget_3 afterRender'); }
	});	
	
	
	return Widgets;
});
