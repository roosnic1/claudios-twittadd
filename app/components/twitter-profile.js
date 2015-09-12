import Ember from 'ember';

export default Ember.Component.extend({


	actions: {
		add: function() {
			this.sendAction('action',this.get('profile'),true);
		},
		delete: function() {
			this.sendAction('action',this.get('profile'),false);
		}
	}
});
