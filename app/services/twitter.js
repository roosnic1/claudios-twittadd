import Ember from 'ember';

export default Ember.Service.extend({

	isAuthenticated: false,
	result: null,

	user: null,

	error: null,

	init: function() {
		this._super();
		this.set('isAuthenticated',false);
		this.set('error','');
		OAuth.initialize('fvf8IDzcTXgJgb5S3hNzKMchYvY');
		console.log('OAuth is initialized');
	},

	authenticateFromCache: function() {
		var self = this;
		this.set('error','');
		var twitter = OAuth.create('twitter');
		if(twitter) {
			this.set('result',twitter);
			twitter.me().done(function(user) {
				self.set('user',user);
				self.set('isAuthenticated',true);
			});
		}
	},

	authenticate: function() {
		var self = this;
		this.set('error','');
		OAuth.popup('twitter',{cache: true}).done(function(result) {
			self.set('result',result);
			result.me().done(function(user) {
				self.set('user',user);
				self.set('isAuthenticated',true);
			});
		}).fail(function(err) {
			self.set('isAuthenticated',false);
			self.set('result',null);
			self.set('user',null);
			self.set('error','Authentication with twitter failed');
		});
	},

	logout: function() {
		OAuth.clearCache('twitter');
		this.set('error','');
		this.set('isAuthenticated',false);
		this.set('result',null);
		this.set('user',null);
	}
});


