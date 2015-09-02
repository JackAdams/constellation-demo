Template.brochure.helpers({
	
	pages : function() {
		return Pages;
	}

});

pageDirections = [
	{direction:"right",key:39},
	{direction:"left",key:37},
	{direction:"up",key:38},
	{direction:"down",key:40}
];

Template.transition_page.helpers({
	
	directions: function() {
		return pageDirections;
	},
	
	pageHasDirection : function(page) {
		return page[this.direction];	
	}
	
});

var directionEvents = {};

getLevelRoute = function(defaultRoute,direction) {
  var route = defaultRoute;
  if (_.contains(['up','down'],direction)) {
	nextPage = _.find(Pages,function(p) { return p.route === route;});
	var level = nextPage.menu || nextPage.submenu || 0;
	// Try to find the last page from this level
	if (level && sublocation[level]) {
	  route = sublocation[level];	
	}
  }
  return route;
}

_.each(pageDirections, function(dir) {
  directionEvents['click .go-' + dir.direction] = function() {
	var route = getLevelRoute(this.page[this.direction],this.direction);
	currentAnimationName = ConstellationDemo.get('animation') + '-' + dir.direction;
	Router.go('/' + route);
  }
});

Template.transition_page.events(directionEvents);

Template.page_content.helpers({
	
	page : function() {
		return Template[this.template];
	},
	
	route: function() {
		return this.route.replace(/\//g,"_");	
	}
	
});

/*Template.body.events({
    'keydown' : function(event) {
		if (PageTransitioner.isAnimating()) {
		  	return;	
		}
		var dir = '';
		switch (event.which) {
			case 37 :
				dir = 'left';
				break;
			case 38 :
				dir = 'up';
				break;
			case 39 :
				dir = 'right';
				break;
			case 40 :
				dir = 'down';
				break;
			default :
				break;
		}
		if (!dir) {
		    return;	
		}
		// Need to get the current page
		var route = Router.current().route.getName();
		var path = route && route.replace(/_/g,'/') || 'home';
		if (path) {
		    var page = _.find(Pages,function(page) {
				return page.route === path;
			});
			if (page && page[dir]) {
				var route = getLevelRoute(page[dir],dir);
				currentAnimationName = ConstellationDemo.get('animation') + '-' + dir;
				Router.go('/' + route);
			}
		}
    }
});*/

Template.brochureMenu.helpers({
	menuItems: function() {
		return _.filter(Pages,function(page) {
			return page.menu;
		});
	},
	route: function() {
		return this.route.replace(/\//g,"_");	
	},
	active: function() {
		var path = Router.current() && Router.current().route && Router.current().route.getName();
		if (!path) {
			path = 'home';	
		}
		var page = ConstellationDemo.get('page');
		return path === this.route || (page && page.submenu === this.menu);	
	},
	submenuItems: function() {
		var self = this;
		return _.filter(Pages,function(page) {
			return page.submenu === self.menu;
		});
	}
});