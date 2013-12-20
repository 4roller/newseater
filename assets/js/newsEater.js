var newsEater = (function(){
	var curTimestamp = Math.round((new Date()).getTime()) ; 
	return {
		init: function() {
			newsEater.addListeners();

		},
		niceDate : function(dateString) {
			var output;
			var unixtime = Date.parse( dateString );
			var timeDiff = Math.round( (curTimestamp - unixtime)  );
			if ( timeDiff < 8.28e+7 && timeDiff > 3.6e+6) {
				hour = Math.round(Math.abs(timeDiff/3.6e+6));
				if (hour == 1) {
					output = "1 hour ago";
				} else {
					output = hour + " hours ago";
				}

			} else if(timeDiff < 3.6e+6) {
				output = Math.round(Math.abs(timeDiff/60000)) + " minutes ago";
			} else {
                var d = new Date(unixtime);
				output = d.toString('dddd, MMMM, yyyy').substr(0,16);
				// For browsers that don't have ISO-8601 Date implementation
				if (output === 'Invalid Date') {
					output = dateString;
				}
			}
			output  = dateString;
			return output;
		},
		addListeners: function() {
			document.querySelector('#back2Top').addEventListener('click', function() { window.scrollTo(0,0); });
			document.querySelector('#showBodyToggle').addEventListener('click', function() { newsEater.showBodyToggle(); });
			//$(document).on('keyup', function(e){ newsEater.keys(e); } );
			//$('body').on('touchstart', function(e){ newsEater.handleTouchStart(e); } );
			//$('body').on('touchmove', function(e){ newsEater.handleTouchMove(e); } );
			//$('body').on('touchend', function(e){ newsEater.handleTouchEnd(e); } );
		},
		showBodyToggle: function() {
			document.querySelector('.newsList').classList.toggle('showAll');
		},
		keys: function(e) {
			//console.log(e.which);
			switch(e.which) {
			}
		},
		onTouchStart:function(e) {
			//e.preventDefault();
			//console.log(e.originalEvent);
			startx = e.originalEvent.changedTouches[0].screenX;
			starty = e.originalEvent.changedTouches[0].screenY;
			ts = e.originalEvent.timeStamp;
			//alert("(" + startx + "," + starty + ")", ts);
		},
		onTouchEnd:function(e) {
			//e.preventDefault();
			//console.log(e.originalEvent);
			startx = e.originalEvent.changedTouches[0].screenX;
			starty = e.originalEvent.changedTouches[0].screenY;
			ts = e.originalEvent.timeStamp;
			//alert("(" + startx + "," + starty + ")", ts);

		},
		handleTouchMove:function(e) {
			var startX,startY,startTime, endX,endY,endTime;

			document.addListeners('touchstart', newsEater.onTouchStart(), false);

			//e.preventDefault();
			console.log( e.originalEvent.changedTouches[0].screenX );

		}

	}
})();

newsEater.init();


