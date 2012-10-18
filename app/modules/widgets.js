define([
	'app'
], function(app) {
	var Widgets = app.module();
	
	// widget model
	Widgets.Model = Backbone.Model.extend();
	
	// widget collection
	Widgets.Collection = Backbone.Collection.extend({
		model: Widgets.Model
	});
	
	Widgets.Views.widget_1 = Backbone.View.extend({
		data: function() { return this.model.toJSON(); }
	});
	
	Widgets.Views.widget_2 = Backbone.View.extend({
		data: function() { return this.model.toJSON(); }
	});
	
	Widgets.Views.widget_3 = Backbone.View.extend({
		data: function() { return this.model.toJSON(); }
	});
	
	
	
	
	//
	// BOILERPLATE VIEW FOR WIDGETS
	//
	
	/*
	
	Widgets.Views.boilerplate_view = Backbone.View.extend({
		initialize: function() { this.model.on('change', this.render, this); },
		cleanup: function() { this.model.off('change', null, this); },
		data: function() { return this.model.toJSON(); },
		events: {
			'click #main_widget header ul.dropdown li > a': function(e){ app.trigger('widget:dropdownClick', e); },
			'click #main_widget header ul.dropdown ul li a': function(e){ app.trigger('widget:dropdownSelected', e, this); }
		},
		afterRender: function() {
			var self = this;
			
			// hide widget content until fully rendered
			if (!this.rendered) {
				this.$('article').css({opacity: 0});
				this.$('.spinner').show();
			}
			
			// start widget configuration
				
			
			// show the widgets content after we've done the above rendering
			this.$('article').animate({ opacity: 1 }, 'slow');
			this.$('.spinner').fadeOut('slow');
			this.rendered = true; // helps keeps track of rendered state
		}
	});
	
	*/
	
	return Widgets;
});
