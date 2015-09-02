sublocation = {};

ConstellationDemo = new ReactiveDict('constellation-demo');

ConstellationDemo.setDefault('page',null);
ConstellationDemo.setDefault('animation','move');
currentAnimationName = null;

pageTransitionerController = RouteController.extend({
  template: "brochure",
  action: function() {
	if (typeof PageTransitioner !== 'undefined') {
	  var pageName = Router.current().route.getName() && Router.current().route.getName().replace(/_/g,'/') || 'home';
	  var animationName = currentAnimationName;
	  var direction = animationName && animationName.split('-')[1];
	  var current = ConstellationDemo.get('page') && ConstellationDemo.get('page').route || PageTransitioner.current();
	  var nextPage = null;
	  _.each(Pages,function(page) {
		if (page.route === pageName) {
		  nextPage = page;	
		}
		if (page.route === current) {
		  if (!animationName) {
			_.each(["left","right","up","down"],function(dir) {  
			  if (page[dir] === pageName) {
				animationName = ConstellationDemo.get('animation') + '-' + dir;	
			  }
			});
		  }
		}
	  });
	  if (!animationName && nextPage) {
		var currentLevel = ConstellationDemo.get('page') && (ConstellationDemo.get('page').menu || ConstellationDemo.get('page').submenu) || 0;
		var nextLevel = nextPage.menu || nextPage.submenu || 0;
		if (currentLevel && nextLevel) {
		  if (currentLevel < nextLevel) {
			animationName = ConstellationDemo.get('animation') + '-down';	
		  }
		  if (currentLevel > nextLevel) {
			animationName = ConstellationDemo.get('animation') + '-up';	
		  }
		}
	  }
	  if (PageTransitioner.toPage(pageName,animationName || ConstellationDemo.get('animation') + '-left') && nextPage) {
	    sublocation[nextPage.menu || nextPage.submenu || 0] = nextPage.route;
		ConstellationDemo.set('page',nextPage);
	  }
	}
	currentAnimationName = null;
  }
});

Router.map(function () {
  
  var self = this;
  
  this.route('/', {
	 controller: pageTransitionerController 
  });
  
  _.each(Pages, function(page) {
    self.route(page.route.replace(/\//g,"_"), {
	  path : '/' + page.route,
	  controller: pageTransitionerController
    });
  
  });
  
});

Router.configure({
  notFoundTemplate : "brochure"
});