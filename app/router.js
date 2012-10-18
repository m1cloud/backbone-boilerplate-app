define([
	'app',
	'backbone',
	'routemanager',
	
	// load app modules
	'modules/main_app',
	'modules/widgets',

	// load page modules
	'modules/dashboard',
	'modules/login'
], function(app, Backbone, RouteManager, MainApp, Widgets, Dashboard, Login) {
	var Router = Backbone.Router.extend({
		
		// handy - we can specify functions to be performed before routes!
		before: {
			'dashboard': 'auth' // regex catch all (/.*/)
		},		
		
		routes: {
			'dashboard': 'dashboard',
			'login': 'login',
			'logout': 'logout',
			'*page': 'all'
		},
		
		all: function() {
			$('#inner_content').empty();
		},
		
		dashboard: function() {
			var self = this;

			self.widgets = new Widgets.Collection();
			self.widgets.url = app.apiURL + 'widgets/dashboard.json';
			
			self.widgets.fetch({
				success: function(widgets) {
					self.page_layout.setViews({
						'#inner_content': new Dashboard.Views.Index({ collection: self.widgets })
					}).render().done(self.render_complete);
				}
			});
		},
		
		login: function() {
			app.useLayout('login').setViews({
				'.login-form-container': new Login.Views.Index({model: this.session})
			}).render().done(this.render_complete);
		},
		
		logout: function() {
			var self = this;
			
			$(this.layout.el).fadeOut('slow', function() {
				self.session.remove(function() {
					self.initialize();
					Backbone.history.navigate('login', true);
				});
			});
		},
		
		initialize: function() {
			var self = this;
			self.session = new MainApp.SessionModel();
			
			// we certainly don't want to do the below if the user isn't logged in!
			if (self.session.authenticated()) { // is user euthenticated?
				
				// create variables for models and collection we'll be using throughout the router
				self.app_model = new MainApp.Model();
				
				// specific a global page_layout here, then we don't have to keep specifying it everywhere 
				self.layout = app.useLayout('main');
				
				// also create a variable for the inner-content (the main white area) where pages are loaded into
				// seperating this allows us to only re-render a portion of the screen, rather than the entire app
				self.page_layout = this.layout.views['#content'];
			
				// boostrap the entire application with some site info!
				// NOTE: we're not bootstrapping the models as per http://ricostacruz.com/backbone-patterns/#bootstrapping_data
				// simply because its too difficult with sessions with the API (cross-domain, etc) - otherwise it's quite easy!
				self.app_model.fetch({
					success: function(app_model) {
						// start up the main app - add any views for the main app
						self.layout.setViews({
							'#sidebar': new MainApp.Views.Menu({model: app_model}),
							'#account_dropdown': new MainApp.Views.Account({model: app_model}) // top-right account menu for user
						}).render().done(self.render_complete);
																
						// if we've just logged in, we need to update the route, and navigate to the default route to dashboard once we are all done
						// and make sure we do that same for a demo route!
						if (Backbone.history.fragment == 'login') { Backbone.history.navigate('dashboard', true); }
					}
				});
			}
		},
		
		render_complete: function(el) {
			$(el).fadeIn('slow');
			$('.app_spinner').hide();
		},

		// this function is called on every route navigations, sets up useful stuff.
		navigate: function(page) {
			this.app_model.set('active', page); // sets main menu active state
		},
		
		// create a route middleware layer to check if user is authenticated
		// redirect to /login if they aren't authed - this is called before each route
		auth: function() {
			// is this user authenticated?
			if (this.session.authenticated()) {
				// if they are, call navigate which sets various things
				// but also return (anything but false) to continue along the route
				return this.navigate(Backbone.history.fragment);
			} else {
				// if not, just send to login page
				return Backbone.history.navigate('login', true);
			}
		}
	});

	return Router;
});