import Ember from 'ember';

export default Ember.Service.extend({

	init: function() {
		this._super();
		OAuth.initialize('fvf8IDzcTXgJgb5S3hNzKMchYvY');
	},

	authenticate: function() {
		OAuth.popup('twitter').done(function(twitter) {
			console.log(twitter);
		  //make API calls with `twitter`
		}).fail(function(err) {
		  //todo when the OAuth flow failed
		});

	}
});
