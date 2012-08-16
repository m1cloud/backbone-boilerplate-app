define([
	'jquery',
	'lodash',
	'backbone',
	
	// load the app-core libraries here
	'handlebars',
	'layoutmanager',
], function($, _, Backbone, Handlebars) {
	// Provide a global location to place configuration settings and module creation.
	var app = {
		root: '/'
	};
	
	// Localize or create a new JavaScript Template object.
	var JST = window.JST = window.JST || {};

	// Configure LayoutManager with Backbone Boilerplate defaults.
	Backbone.LayoutManager.configure({
		// Allow LayoutManager to augment Backbone.View.prototype.
		manage: true,
		
		paths: {
			layout: 'app/templates/layouts/',
			template: 'app/templates/'
		},
		
		fetch: function(path) {
			var done = this.async();
			path = path + '.html';

			if (JST[path]) { return Handlebars.template(JST[path]); }
			
			// Otherwise seek out the template asynchronously.
			$.ajax({ url: app.root + path }).then(function(contents) {
				done(JST[path] = Handlebars.compile(contents));
			});
		}		
	});
		
	// Mix Backbone.Events, modules, and layout management into the app object.
	return _.extend(app, {
		// Create a custom object with a nested Views object.
		module: function(additionalProps) {
			return _.extend({ Views: {} }, additionalProps);
		},
		
		// Helper for using layouts.
		useLayout: function(name) {
			if (this.layout) {
				if (this.layout.options.template === name) {
					return this.layout;
				} else {
					this.layout.remove();
				}
			}
		
			// Create a new Layout.
			this.layout = new Backbone.Layout({
				template: name,
				className: 'layout ' + name,
				id: 'layout'
			});
		
			// Insert into the DOM.
			$('#main_container').empty().append(this.layout.el);
			
			// Return the reference, for chainability.
			return this.layout;
		}
	}, Backbone.Events);
});