import Ember from 'ember';

export default Ember.Service.extend({

	userIsAuthenticated: false,

	twitter: null,

	init: function() {
		this._super();
		this.set('userIsAuthenticated',false);
		OAuth.initialize('fvf8IDzcTXgJgb5S3hNzKMchYvY');
	},

	authenticate: function() {
		OAuth.popup('twitter').done(function(twitter) {
			this.set('userIsAuthenticated',true);
			this.set('twitter',twitter);
			console.log('It Worked');
			console.log(twitter);
		  //make API calls with `twitter`
		}).fail(function(err) {
			this.set('userIsAuthenticated',false);
			this.set('twitter',null);
			console.log('It didnt Worked');
		  //todo when the OAuth flow failed
		});
	}
});
