import Ember from 'ember';

export default Ember.Controller.extend({

	twitter: Ember.inject.service(),

	twittAccounts: '',
	twittAccountInfos: [],

	init: function() {
		this._super();
		console.log('Application Controller init');
	},


	getAccountInfos: function(accounts) {
		var screenNames = '';
		accounts.forEach(function(item,index) {
			screenNames += item;
			if(index + 1 < accounts.length) {
				screenNames += ',';
			}
		});
		var self = this;
		this.get('twitter.result').get('https://api.twitter.com/1.1/users/lookup.json?screen_name='+screenNames).done(function(data) {
			console.log(data);
			self.get('twittAccountInfos').pushObjects(data);
		}).fail(function(err) {
			console.warn('Could not get Data from Twitter',err);
		});
	},


	actions: {
		authenticate: function() {
			this.get('twitter').authenticate();
		},

		logout: function() {
			this.get('twitter').logout();
		},

		checkAccounts: function() {
			console.log(this.get('twittAccounts'));
			var i = this.get('twittAccounts').replace(/(\r\n|\n|\r|,)/gm,"");

			var accounts = i.split('@');
			if(accounts.length > 0) {
				accounts.shift();
				console.log(accounts);
				this.getAccountInfos(accounts);
			} else {
				console.warn('Input Data not parsable');
			}
		},

		initService: function() {
			/*var id = this.get('twitter.user.id');
			console.log('Getting friends of Id: ' + id);
			this.get('twitter.result').get('https://api.twitter.com/1.1/friends/ids.json?cursor=-1&user_id='+id+'&count=5000').done(function(data) {
				console.log(data);
			});*/
			console.log(this.get('twittaccounts'));
		}
	}
});
