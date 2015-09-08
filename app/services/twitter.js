import Ember from 'ember';

export default Ember.Service.extend({

	userIsAuthenticated: false,

	twitter: null,

	init: function() {
		this._super();
		this.set('userIsAuthenticated',false);
		OAuth.initialize('fvf8IDzcTXgJgb5S3hNzKMchYvY');
		console.log('OAuth is initialized');
	},


	startInit: function() {
		console.log('Starting INIT');
	},

	authenticate: function() {
		var self = this;
		OAuth.popup('twitter').done(function(result) {
			self.set('userIsAuthenticated',true);
			self.set('twitter',result);
			console.log(result);
		}).fail(function(err) {
			self.set('userIsAuthenticated',false);
			self.set('twitter',null);
			console.log('It didnt Worked');
		});
	}
});


