Players = new Mongo.Collection(null);
hideMe = new Mongo.Collection(null);

Package["babrahams:temple"].Temple.exclude(".pt-page");

if (Players.find().count() === 0) {
  var names = ["Ada Lovelace", "Grace Hopper", "Marie Curie",
			   "Carl Friedrich Gauss", "Nikola Tesla", "Claude Shannon"];
  _.each(names, function (name) {
	Players.insert({
	  name: name,
	  score: Math.floor(Random.fraction() * 10) * 5
	});
  });
}

Meteor.subscribe('users');

var thingsToDo = [
  'CTRL + C (or click the blue dot at the bottom left of the screen)',
  'Click on the "Config | Guide" tab and reveal the "Account" and "Full screen" tabs, then hide the "hideMe" collection',
  'Click on the "Account" tab and impersonate the user in the database (Click "Choose account" then "Impersonate")',
  'Change the user\'s username (click on the green text by the "username" field)',
  'Switch "Autopublish" on to see the unpublished fields from the user document in the "Account" tab',
  'Click the "players" tab and change some players\' names and scores by editing the documents in the "players" collection',
  'Go to the "Actions" tab and click the undo button to undo some of your changes',
  'Open the "Actions" tab and take a look at the actions log',
  'Click the "players" tab again, then click the "?" icon that appears at the top right and search for a player with name: "Marie" (use the select to choose the "name" field)',
  'Click on the _id field and copy it',
  'Go to the "Session" tab and change the `selectedPlayer` to "Marie Curie" by pasting the copied _id value (if there isn\'t a player selected already: click to the right of the {}, then click on the fieldname "newField", change it to "selectedPlayer", then paste the copied _id as its value)',
  'Click on the "Subscriptions" tab to see which subscriptions are active',
  'Click on the "Subscriptions" tab again to close it and minimize the UI',
  'Go "Tiny" then back to normal size',
  'Go "Full screen" then back to normal size',
  'Open the "Temple" tab and start rolling over the leaderboard',
  'Click the "On/Off" button on the "Temple" tab to see where the templates are',
  /*'Click on the "DDP Inspector" tab and see what\'s been going on between client and server',*/
  'Just for a laugh, go to the "Session" tab again and select the "ConstellationDemo" ReactiveDict, then change the "animation" to "cube" (instead of "move") and start navigating around the site using the menus at the top',
  'That\'s it. "meteor add babrahams:constellation" to one of your projects and try it for yourself!'
];

var ThingToDo = new ReactiveDict('thingToDo');
ThingToDo.set('thingToDo', 0);

Template.demo.helpers({
  thingsToDo: function () {
	var index = ThingToDo.get('thingToDo') ;
	return [
	  // { current: false, thing: thingsToDo[index - 1] },
	  { number: index + 1, current: true, thing: thingsToDo[index] },
	  // { current: false, thing: thingsToDo[index + 1] }
	] 
  }
});

Template.demo.events({
  'click .prev, click .next' : function (evt) {
	var index = ThingToDo.get('thingToDo');
	if ($(evt.target).hasClass('next')) {
	  index++;  	
	}
	else {
	  index--;
	}
	if (index < 0) 
	  index = 0;
	if (index >= thingsToDo.length) {
	  index = thingsToDo.length - 1;	
	}
	ThingToDo.set('thingToDo', index);
  }
});

Template.leaderboard.helpers({
  players: function () {
    return Players.find({}, { sort: { score: -1, name: 1 } });
  },
  selectedName: function () {
    var player = Players.findOne(Session.get("selectedPlayer"));
    return player && player.name;
  }
});

Template.leaderboard.events({
  'click .inc': function () {
    Players.update(Session.get("selectedPlayer"), {$inc: {score: 5}});
  }
});

Template.player.helpers({
  selected: function () {
    return Session.equals("selectedPlayer", this._id) ? "selected" : '';
  }
});

Template.player.events({
  'click': function () {
    Session.set("selectedPlayer", this._id);
  }
});