Meteor.publish("users", function () {
  return Meteor.users.find({},{fields:{emails:1}});
});

Meteor.startup(function () {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: "test",
      email: "test@test.com",
      password: "test"
    });
  }
});