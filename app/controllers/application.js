import Ember from 'ember';

export default Ember.Controller.extend({

	twitter: Ember.inject.service(),

	twittAccounts: '',
	twittAccountInfos: [],

	hasTwittAccountInfos: function() {
		if(this.get('twittAccountInfos.length') > 0) {
			return true;
		} else {
			return false;
		}
	}.property('twittAccountInfos.@each'),

	init: function() {
		this._super();
		console.log('Application Controller init');
		this.get('twitter').authenticateFromCache();
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
			data.forEach(function(item) {
				self.get('twittAccountInfos').pushObject(Ember.Object.create(item));
			});
		}).fail(function(err) {
			console.warn('Could not get Data from Twitter',err);
		});
	},

	addProfiles: function(profiles) {
		if(profiles.constructor !== Array) {
			profiles = [profiles];
		}

		var self = this;
		profiles.forEach(function(item) {
			self.get('twitter.result').post('https://api.twitter.com/1.1/friendships/create.json?user_id=' + item.id + '&follow=true').done(function(data) {
				console.log(data);
				item.set('isAdded',true);
				setTimeout(function() {
					self.get('twittAccountInfos').removeObject(item);
				},1200);
			}).fail(function(err) {
				console.warn('Could not add friend',err);
			});
		})
	},


	actions: {
		authenticate: function() {
			this.get('twitter').authenticate();
		},

		logout: function() {
			this.get('twitter').logout();
		},

		checkAccounts: function() {
			var i = this.get('twittAccounts').replace(/(\r\n|\n|\r|,)/gm,"");
			var accounts = i.split('@');
			if(accounts.length > 0) {
				accounts.shift();
				this.set('twittAccounts','');
				this.getAccountInfos(accounts);
			} else {
				console.warn('Input Data not parsable');
			}
		},

		addAllProfiles: function() {
			var self = this;
			this.addProfiles(this.get('twittAccountInfos'));
			/*this.get('twittAccountInfos').forEach(function(item) {
				self.addProfile(item);
			});*/
		},

		handleProfile: function(profile,add) {
			if(add) {
				this.addProfiles(profile);
			} else {
				this.get('twittAccountInfos').removeObject(profile);
			}

		}
	}
});
