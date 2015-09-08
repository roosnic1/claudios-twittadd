import Ember from 'ember';

export default Ember.Service.extend({

	userIsAuthenticated: false,
	result: null,

	user: null,

	init: function() {
		this._super();
		this.set('userIsAuthenticated',false);
		OAuth.initialize('fvf8IDzcTXgJgb5S3hNzKMchYvY');
		console.log('OAuth is initialized');
	},

	authenticate: function() {
		var self = this;
		OAuth.popup('twitter').done(function(result) {
			self.set('result',result);
			result.me().done(function(user) {
				console.log(user);
				self.set('user',user);
				self.set('userIsAuthenticated',true);
			});
		}).fail(function(err) {
			self.set('userIsAuthenticated',false);
			self.set('result',null);
			self.set('user',null);
			console.log('Auth with twiter failed');
		});
	}
});


