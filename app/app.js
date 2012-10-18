define([
	'jquery',
	'lodash',
	'backbone',
	
	// load the app-core libraries here
	'handlebars',
	'layoutmanager'
], function($, _, Backbone, Handlebars) {
	// Provide a global location to place configuration settings and module creation.
	var app = {
		root: '/',
		isIE: /msie/i.test(navigator.userAgent) && !window.opera, // handy!
		isLowerIE8: (document.all && !document.querySelector) ? true: false,
		apiURL: 'assets/api/'
	};
	
	// Localize or create a new JavaScript Template object.
	var JST = window.JST = window.JST || {};
	
	// Configure LayoutManager with Backbone Boilerplate defaults.
	Backbone.LayoutManager.configure({
		manage: true,
		prefix: 'app/templates/',
		fetch: function(path) {
			var done;
			path = path + '.html';
			
			// If the template has not been loaded yet, then load.
			if (!JST[path]) {
				done = this.async();
				
				return $.ajax({ url: app.root + path }).then(function(contents) {
					JST[path] = Handlebars.compile(contents);
					JST[path].__compiled__ = true;
					done(JST[path]);
				});
			}
			
			// If the template hasn't been compiled yet, then compile.
			if (!JST[path].__compiled__) {
				JST[path] = Handlebars.template(JST[path]);
				JST[path].__compiled__ = true;
			}
			
			return JST[path];			
		}		
	});

	// Mix Backbone.Events, modules, and layout management into the app object.
	return _.extend(app, {
		// Create a custom object with a nested Views object.
		module: function(additionalProps) {
			return _.extend({ Views: {} }, additionalProps);
		},
	
		// Helper for using layouts.
		useLayout: function(name, options) {
			if (this.layout && this.layout.options.template === name) {
				return this.layout;
			}
			
			// Create a new Layout.
			this.layout = new Backbone.LayoutView(_.extend({
				template: name,
				className: 'layout ' + name,
				id: 'layout',
				views: {
					'#content': new Backbone.LayoutView({
						template: 'page'
					})
				}
			}, options));
			
			// Insert into the DOM.
			$(this.layout.el).hide();
			$('#main_container').empty().append(this.layout.el);
			$('#main_container').prepend('<div class="app_spinner spinner"><img class="spinner" src="/assets/img/spinner_24x24_white.gif" /><p>Loading App…</p></div>');
			
			// don't render yet...
			return this.layout;
		}
	}, Backbone.Events);
});
