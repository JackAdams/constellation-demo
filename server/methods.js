Meteor.methods({
	sendEmail: function(text) {
		if (!isURL(text)) {
		  throw new Meteor.Error('You need to submit a URL');	
		}
		// Let other method calls from the same client start running,
		// without waiting for the email sending to complete.
		this.unblock();
		Email.send({
		  to: 'standbench@gmail.com',
		  from: 'info@standbench.com',
		  subject: 'Suggested Meteor dev tool',
		  text: text
		});
	}
});