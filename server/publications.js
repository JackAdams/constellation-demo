Meteor.publish("users", function () {
  return Meteor.users.find({},{fields:{emails:1}});
});

Meteor.publish("tools", function () {
  return Tools.find();
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