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

SyncedCron.add({
  name: 'Clean out the users collection and add one user',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 15 minutes');
  },
  job: function() {
    Meteor.users.remove({});
	Accounts.createUser({
	  password: "password",
	  email: "test@test.com",
	  username: "test"
	});
  }
});

SyncedCron.start();