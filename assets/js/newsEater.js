var newsEater = (function(){
	var curTimestamp = Math.round((new Date()).getTime()) ; 
	return {
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
			return output;
		},
		addListeners: function() {
			$('#back2Top').click(function() {
				window.scrollTo(0,0);
			});
		}
	}
})();

$(document).ready(function() {
	newsEater.addListeners();
});

