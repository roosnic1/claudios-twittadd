import Ember from 'ember';

export default Ember.Component.extend({

	twitterProfileImage: Ember.computed('profile.profile_image_url_https', function() {
		var bg = 'url(' + this.get('profile.profile_image_url_https') + ')';
		return new Ember.Handlebars.SafeString('background-image: ' + bg);
	}),


	actions: {
		add: function() {
			this.sendAction('action',this.get('profile'),true);
		},
		delete: function() {
			this.sendAction('action',this.get('profile'),false);
		}
	}
});
