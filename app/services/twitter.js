import Ember from 'ember';
import ENV from 'claudios-twittadd/config/environment';

export default Ember.Service.extend({

	isAuthenticated: false,
	result: null,

	user: null,

	error: null,

	init: function() {
		this._super();
		this.set('isAuthenticated',false);
		this.set('error','');
		OAuth.initialize(ENV.oauthPubKey);
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
				ga('send','event','authentication','fromCache','success');
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
				ga('send','event','authentication','login','success');
			});
		}).fail(function(err) {
			self.set('isAuthenticated',false);
			self.set('result',null);
			self.set('user',null);
			self.set('error','Authentication with twitter failed');
			ga('send','event','authentication','login','failure');
			console.log('Authentication with twitter failed',err.message);
		});
	},

	logout: function() {
		OAuth.clearCache('twitter');
		this.set('error','');
		this.set('isAuthenticated',false);
		this.set('result',null);
		this.set('user',null);
		ga('send','event','authentication','logout','success');
	}
});


