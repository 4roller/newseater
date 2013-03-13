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
		'click .navLink': "navSelect"
	},
	initialize: function() {
		setTimeout(function(){
			var frag = Backbone.history.fragment;
			var src = frag.substr(0, frag.indexOf("/"));
			var el =  '.image-' + src;
			var cat = '.cat-' + src;
			// Highlight Source
			$(el).addClass('selected');

			//Reset and highlight Category
			if(src != '') {
				$('.categories').fadeOut().hide();
			}
			$(cat).fadeIn().show();
			var catEls = cat + ' li a';
			$(catEls).each(function(){
				if(this.href.indexOf(frag) != -1) {
					$(this).addClass('on');
				}
			});
		}, 10);
	},
	sourceSelect: function (e) {
		var cat
		var el = e.target;
		var src = $(el).attr('data-src');
		$('.navSource').each(function() {
			$(this).removeClass('selected');
		});
		$(el).addClass('selected');
		var cat = '.cat-' + $(el).attr('data-src');
		router.navigate('#/' + src + '/top_stories');				
		this.initialize();	
	},
	navSelect: function(e) {
		$('.navLink').each(function() {
			$(this).removeClass('on');
		});
		var el = e.target;
		$(el).addClass('on');
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
			$.get( tpl, function(data) {
				that.templateCache[tpl]	= data;
				callbackFn(data);
			});
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
					}, 150, function(){
						that.$el.html(template);
						that.$el.animate({
							opacity:1
						},150);
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

