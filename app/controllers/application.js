import Ember from 'ember';

export default Ember.Controller.extend({
	twitter: Ember.inject.service(),

	init: function() {
		this._super();
		console.log('Application Controller init');
	},


	actions: {
		testTwitter: function() {
			this.get('twitter').authenticate();
		},
		initService: function() {
			console.log('initS');
			//this.get('twitter').startInit();
		}
	}
});
