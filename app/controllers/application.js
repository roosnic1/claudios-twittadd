import Ember from 'ember';

export default Ember.Controller.extend({

	twitter: Ember.inject.service(),

	twittAccounts: '',
	twittAccountInfos: [],

	notificationMessage: '',

	onNotificationMessageChange: function() {
		var self = this;
		var oldMsg = this.get('notificationMessage');
		setTimeout(function() {
			if(self.get('notificationMessage') === oldMsg) {
				self.set('notificationMessage','');
			}
		},5000);
	}.observes('notificationMessage'),

	hasTwitterError: function() {
		var error = this.get('twitter.error');
		if(error.length > 0) {
			this.set('notificationMessage',error);
		}
	}.observes('twitter.error'),

	hasTwittAccountInfos: Ember.computed('twittAccountInfos.[]',function() {
		if(this.get('twittAccountInfos.length') > 0) {
			return true;
		} else {
			return false;
		}
	}),

	init: function() {
		this._super();
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
			var errorMessage = 'Error while getting Users.';
			if(err.responseJSON.errors.length > 0) {
				errorMessage += ' Message: ' + err.responseJSON.errors[0].message;
			}
			self.set('notificationMessage',errorMessage);
	});
	},

	addProfiles: function(profiles) {
		if(profiles.constructor !== Array) {
			profiles = [profiles];
		}
		var length = profiles.length;
		var orgLength = profiles.length;
		var self = this;
		profiles.forEach(function(item) {
			self.get('twitter.result').post('https://api.twitter.com/1.1/friendships/create.json?user_id=' + item.id + '&follow=true').done(function() {
				item.set('isAdded',true);
				length -= 1;
				if(length === 0) {
					self.set('notificationMessage','Added ' + orgLength + ' Profile(s)');
				}
				setTimeout(function() {
					self.get('twittAccountInfos').removeObject(item);
				},1200);
			}).fail(function(err) {
				console.warn('Could not add friend',err);
				var errorMessage = 'Error while adding User.';
				if(err.responseJSON.errors.length > 0) {
					errorMessage += ' Message: ' + err.responseJSON.errors[0].message;
				}
				self.set('notificationMessage',errorMessage);
			});
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
			var i = this.get('twittAccounts').replace(/(\r\n|\n|\r|,)/gm,"");
			if(i <= 0) {
				return;
			}
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
			this.addProfiles(this.get('twittAccountInfos'));
		},

		handleProfile: function(profile,add) {
			if(add) {
				this.addProfiles(profile);
			} else {
				this.get('twittAccountInfos').removeObject(profile);
			}

		},

		dismissNotification: function() {
			this.set('notificationMessage','');
		}
	}
});
