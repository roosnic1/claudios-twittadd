import Ember from 'ember';

export default Ember.Controller.extend({

	twitter: Ember.inject.service(),

	twittaccounts: '',

	init: function() {
		this._super();
		console.log('Application Controller init');
	},


	actions: {
		authenticate: function() {
			this.get('twitter').authenticate();
		},

		logout: function() {
			this.get('twitter').logout();
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
