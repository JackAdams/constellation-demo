Pages = [
	{text:"Constellation",menu:1,class:"pages-home",template:"page_home",route:"home",down:"demo"},
	{text:"Demo",menu:2,class:"pages-demo",template:"page_demo",route:"demo",up:"home",down:"tools",right:"demo/video",left:"demo/video"},
	{text:"Video",submenu:2,class:"pages-demo",template:"page_demo_video",route:"demo/video",up:"home",right:"demo",left:"demo",down:"tools"},
	{text:"Dev tools",menu:3,class:"pages-tools",template:"page_tools",route:"tools",up:"demo",right:"tools/comparison",left:"tools/comparison"},//,down:"tournament"
	{text:"Comparison",submenu:3,class:"pages-tools",template:"page_tools_comparison",route:"tools/comparison",up:"demo",right:"tools/add",left:"tools"},//,down:"tournament"
	{text:"More",submenu:3,class:"pages-tools",template:"page_tools_add",route:"tools/add",up:"demo",right:"tools",left:"tools/comparison"},//,down:"tournament"
	/*{text:"Tournament",menu:4,class:"pages-tournament",template:"page_tournament",route:"tournament",up:"touch",down:"development"},
	{text:"Development",menu:5,class:"pages-development",template:"page_development",route:"development",up:"tournament"}*/
];

Template.page_tools_add.events({
	'keydown textarea, keydown input' : function(evt) {
	  evt.stopPropagation();	
	},
	'submit form' : function(evt,tmpl) {
	  evt.preventDefault();
	  if (!tmpl.$('form textarea').val() || !tmpl.$('form input').val()) {
		alert('Fill both fields');
		return;  
	  }
	  Meteor.call('sendEmail',tmpl.$('form textarea').val(),tmpl.$('form input').val(),function(err,res) {
		  if (err) {
			alert('Something went wrong. Email not sent');
			console.log(err);
		  }
		  else {
			tmpl.$('form textarea').val('');
			tmpl.$('form input').val('');
			alert('Email sent');  
		  }
	  });
	}
});