/*
*	Jason Leung
*	News Eater 2013.07.22
*	Backbone/Underscore/JQuery
*/


// Collections
var NewsNPR = Backbone.Collection.extend({
	url: 'feeds/newsListNPR.php',
	template: 'templates/news-list-npr.html'
});
var NewsBBC = Backbone.Collection.extend({
	url: 'feeds/newsListBBC.php',
	template: 'templates/news-list-bbc.html'
});
var NewsNYT = Backbone.Collection.extend({
	url: 'feeds/newsListNYT.php',
	template: 'templates/news-list-nyt.html'
});
var NewsReuters = Backbone.Collection.extend({
	url: 'feeds/newsListReuters.php',
	template: 'templates/news-list-bbc.html'
});

// Navigation View
var Navigation = Backbone.View.extend({
	el: '#nav',
	events: {
		'click .navSource': "sourceSelect",
		'click .navLink': "navSelect",
		'keyup': 'handleKeys'
	},
	eventInitFlag: 'false',
	initialize: function() {
		var that = this;
		setTimeout(function(){
			var frag = Backbone.history.fragment;
			var src = frag.substr(0, frag.indexOf("/"));
			var el =  '.image-' + src;
			var cat = '.cat-' + src;
			// Highlight Source
			document.querySelector(el).classList.add('selected');

			//Reset and highlight Category
			if(src != '') {
				var allCats = document.querySelectorAll('.categories');
				for(var i=0; i<allCats.length; i++) {
					allCats[i].classList.remove('shown');
				}
			}
			document.querySelector(cat).classList.add('shown');
			var catEls = document.querySelectorAll(cat + ' li a');
			for(var i = 0; i<catEls.length; i++) {
				if(catEls[i].href.indexOf(frag) != -1) {
					catEls[i].classList.add('on');
				}
			}
		}, 10);
	},
	handleKeys: function(e) {
		switch(e.which) {
			case 39:
				that.nextCat();
				break;
			case 37:
				that.prevCat();
				break;
		}
	},
	currentSource: function() {
		var source = document.querySelector('.newsSources li img.selected').getAttribute('data-src');
		return source;
	},
	currentCategory: function() {
		var source = this.currentSource();
		var catStr = 'cat-' + source;
		var categories = document.querySelectorAll("." + catStr + ' li');
		var len = categories.length;
		for(var i=0; i<len; i++) {
			if( categories[i].querySelector('a.on') ) {
				var retObj = {
					"category": catStr,
					"index": i,
					"catLength": len,
					"node": categories[i].querySelector('a.on')
				}
				return retObj;
			}
		}
	},	
	nextCat: function() {
		var curObj = this.currentCategory();
		if(curObj.index < curObj.catLength-1) {
			this.setCategory(curObj.index+1, curObj);
		}  else  {
			this.setCategory(0, curObj);
		}
	},
	prevCat: function() {
		var curObj = this.currentCategory();
		if(curObj.index > 0) {
			this.setCategory(curObj.index-1, curObj);
		}  else  {
			this.setCategory(curObj.catLength-1, curObj);
		}
	},
	clearLinks: function() {
		var navLinks = document.querySelectorAll('.navLink');
		for(var i=0; i<navLinks.length; i++) {
			navLinks[i].classList.remove('on');
		}
	},
	setCategory: function(index, obj) {
		document.querySelector('.' + obj.category + ' li a.on').classList.remove('on');
		var categories = document.querySelectorAll('.' + obj.category + " li");
		var category = categories[index].querySelector('.navLink');
		category.classList.add('on');
		router.navigate(category.getAttribute('href'));		
	},
	sourceSelect: function (e) {
		var cat;
		var el = e.target;
		var src = el.getAttribute('data-src');
		var navSources = document.querySelectorAll('.navSource');
		for(var i=0; i<navSources.length; i++) {
			navSources[i].classList.remove('selected');
		}
		this.clearLinks();
		el.classList.add('selected');
		router.navigate('#/' + src + '/top_stories');				
		this.initialize();	
	},
	navSelect: function(e) {
		this.clearLinks();
		var el = e.target;
		el.classList.add('on');
	}
});

// NewsList view
var NewsList = Backbone.View.extend({
	el: '.page',
	templateCache: {},
	getTemplate: function(tpl, callbackFn) {
		var that = this;
		// Cache the template
		if( typeof that.templateCache[tpl] == 'undefined') {
			var request = new XMLHttpRequest();
			request.open('GET', tpl, false); 
			request.send(null);
			if(request.responseText != null) {
				data = request.responseText;
				that.templateCache[tpl]	= data;
				callbackFn(data);
			}
		} else { // return a cached template
			callbackFn(that.templateCache[tpl]);
		}
	},
	render: function (options) {
		var that = this;
		var news;
		switch(options.source) {
			case 'npr':
				news = new NewsNPR();
				break;
			case 'bbc':
				news = new NewsBBC();
				break;
			case 'nyt':
				news = new NewsNYT();
				break;
			case 'reuters':
				news = new NewsReuters();
				break;
		}
		news.url += '?cat=' + options.category;

		//First get template then get newsfeed
		this.getTemplate(news.template, function(payloadTpl){
			news.fetch({ 
				success: function(news) {
					var template = _.template( 
						payloadTpl,
						{ news: news.models } 
					);
					// Do some Aninmation
					that.$el.animate({
						opacity:0
					}, 50, function(){
						that.$el.html(template);
						that.$el.animate({
							opacity:1
						},100);
					});
				}
			});
		});
	}
});

// Backbone Router
var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'npr/:category': 'npr',
		'bbc/:category': 'bbc',
		'nyt/:category': 'nyt',
		'reuters/:category': 'reuters'
	}
});

var newsList = new NewsList();
var navigation = new Navigation();

// Start router and listeners
var router = new Router();

router.on('route:home', function (){
	router.navigate('#/nyt/top_stories');
});
router.on('route:npr', function (category){
	newsList.render({source: 'npr', category: category});
});
router.on('route:nyt', function (category){
	newsList.render({source: 'nyt', category: category});
});
router.on('route:bbc', function (category){
	newsList.render({source: 'bbc', category: category});
});
router.on('route:reuters', function (category){
	newsList.render({source: 'reuters', category: category});
});

Backbone.history.start();

