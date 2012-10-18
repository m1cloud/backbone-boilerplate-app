define([
	'app'
], function(app) {
	var Login = app.module();
	
	Login.Views.Index = Backbone.View.extend({
		template: 'login/index',
		className: 'login_view',
		events: {
			'submit #login-form form': 'formSubmit'
		},
		formSubmit: function(e) {
			e.preventDefault();
			var self = this;
			$('.pageload_spinner').show();

			$('.login-form-container').fadeOut('slow', function() {
				console.log('logged in')
				self.model.save({id: 'test'});
				app.router.initialize(); // this restarts the app - this time, we're authenticated!
			});
		},
		afterRender: function() {
			this.$('input.username').val('test');
			this.$('input.password').val('test');
			this.$('input.username').focus();
		}
	});
	
	return Login;
});
