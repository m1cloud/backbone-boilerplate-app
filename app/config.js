require.config({
	deps: ['main'], // Initialize the application with the main application file.
	paths: {
		// Major libraries
		jquery: '../assets/js/libs/jquery',
		lodash: '../assets/js/libs/lodash', // lightweight drop-in version of underscore.js!
		backbone: '../assets/js/libs/backbone', // NOTE - added upsert function to source...
		handlebars: '../assets/js/libs/handlebars', // Handlebars for awesome templating!
		
		layoutmanager: '../assets/js/plugins/backbone.layoutmanager', // excellent layout manager to control views
		routemanager: '../assets/js/plugins/backbone_filters', // excellent route manager
		cookie: '../assets/js/plugins/jquery.cookie'
	},
	shim: { // using a shim allows us to load non-amd libs, but need to be configured below...
		backbone: { deps: ['lodash', 'jquery'], exports: 'Backbone' },
		handlebars: { exports: 'Handlebars' },
		layoutmanager: ['backbone'], // Backbone.LayoutManager depends on Backbone.
		routemanager: ['backbone'], // Backbone.RoutetManager depends on Backbone.
		cookie: ['jquery']
	}
});
