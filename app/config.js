require.config({
	deps: ['main'], // Initialize the application with the main application file.
	paths: {
		// Major libraries
		jquery: '../assets/js/libs/jquery-1.8.0',
		lodash: '../assets/js/libs/lodash', // lightweight drop-in version of underscore.js!
		backbone: '../assets/js/libs/backbone',
		handlebars: '../assets/js/libs/handlebars-1.0.0.beta.6', // Handlebars for awesome templating!
		layoutmanager: '../assets/js/plugins/backbone.layoutmanager'
	},
	shim: { // using a shim allows us to load non-amd libs, but need to be configured below...
		backbone: { deps: ['lodash', 'jquery'], exports: 'Backbone' },
		handlebars: { exports: 'Handlebars' },
		layoutmanager: ['backbone'], // Backbone.LayoutManager depends on Backbone.
	}
});
