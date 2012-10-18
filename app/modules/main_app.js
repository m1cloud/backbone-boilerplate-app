define([
	'app',
	'cookie'
], function(app) {
	var MainApp = app.module();
	
	MainApp.Model = Backbone.Model.extend({
		url: app.apiURL + 'site_info.json'
	});
	
	MainApp.SessionModel = Backbone.Model.extend({
		defaults: {
			user_id: null
		},
		initialize: function() {
			return this.load();
		},
		authenticated: function() {
			return Boolean(this.get('user_id'));
		},
		save: function(auth_hash) {
			$.cookie('user_id', auth_hash.id);
			this.load();
		},
		load: function() {
			return this.set({
				user_id: $.cookie('user_id'),
			});
		},
		remove: function(callback) {
			$.removeCookie('user_id');
			callback();
		}
	});

	
	MainApp.Views.Account = Backbone.View.extend({
		events: {
			'click .top': function(e) { 
				// helps to hide menu when you click anywhere else on the page		
				$('body').one('click',function() { $(e.currentTarget).parent().find('ul').slideUp('slow'); });
				e.stopPropagation();
				$(e.currentTarget).parent().find('ul').slideToggle('slow');
			}
		},
		template: 'header/index',
		data: function() { return this.model.toJSON(); }
	});
	
	MainApp.Views.Menu = Backbone.View.extend({
		template: 'main_menu/index',
		data: function() { return this.model.toJSON(); },
		initialize: function() {
			this.model.on('change:active', this.afterRender, this);
		},
		afterRender: function() {
			this.$('li').removeClass('active');
			// Note the use of "*=" (contains) - IE7 has issues (ha) - the href attr is actually 
			// the absolute path for some bizzare reason not known to man...
			this.$('a[href*="/'+this.model.get('active')+'"]').parent().addClass('active');
			
			// check for nested lists, and set parent li to active as well
			if (this.$('a[href*="/'+this.model.get('active')+'"]').parent().parent().parent().is('li')) {
				this.$('a[href*="/'+this.model.get('active')+'"]').parent().parent().parent().addClass('active');
			}
		}
	});
	
	return MainApp;
});
