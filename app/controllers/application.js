import Ember from 'ember';

export default Ember.Controller.extend({
	twitter: Ember.inject.service(),

	init: function() {
		this._super();
		console.log('Application Controller init');
	},





	actions: {
		testTwitter: function() {
			console.log(this.get('twitter'));
			this.get('twitter').authenticate();
		}
	}
});
