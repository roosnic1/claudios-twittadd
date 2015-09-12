import Ember from 'ember';

export default Ember.Service.extend({

	isAuthenticated: false,

	twitter: null,

	init: function() {
		this._super();
		this.set('isAuthenticated',false);
		OAuth.initialize('fvf8IDzcTXgJgb5S3hNzKMchYvY');
		console.log('OAuth is initialized');
	},


	startInit: function() {
		console.log('Starting INIT');
	},

	authenticate: function() {
		OAuth.popup('twitter').done(function(twitter) {
			this.set('isAuthenticated',true);
			/*this.set('twitter',twitter);
			console.log('It Worked');
			console.log(twitter);*/
		  //make API calls with `twitter`
		}).fail(function(err) {
			this.set('isAuthenticated',false);
			/*this.set('twitter',null);
			console.log('It didnt Worked');*/
		  //todo when the OAuth flow failed
		});
	}
});


