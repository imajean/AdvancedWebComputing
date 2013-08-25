$(function(){

	$('#csw_switch_on').fadeOut(1500, function(){ $(this).hide();});
//code starts here
	var server = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json'
	
	function searchMovie(movie_name){
		$('.itemList').fadeOut(1500, function(){ $(this).remove();});
		$('.items').fadeOut(1500, function(){ $(this).remove();});
		$('body').append('<img id="loadImg" class="items" src="483.gif"/>');

	$.ajax({
		url: server,
		dataType: 'jsonp',
		data: {
			q: movie_name,
			apiKey: 'hcrurhsttexasrgfm2y6yahm'
		},
		success: showMovies
	});

	}

	function showMovies(response){
		console.log('response', response);
		var movies = response.movies;
		var movieTotal = response.total;
		var movieItems = document.getElementsByClassName('items');
			$('.items').remove();
		$('body').append('<h4 class="items">showing ' + movies.length + ' results for "'+ $("#searchBar").val() +'"</h4>');
		for (var i = 0; i <movies.length; i ++){
			var movie = movies[i];
			$('body').append('<div class="itemList" hidden="true" title="'+movie.synopsis+'"><img class="items imge" src="' + movie.posters.profile + '"/><h3 class="items">'+ movie.title + '</h3>' + movie.abridged_cast[0].name + '<br>In theaters: ' + movie.release_dates.theater + '<br>' + movie.mpaa_rating + '<br><br><i>"'+ movie.critics_consensus+'"</i></div>');
			$('.itemList').show( 'slow', function() {
    // Animation complete.
  });
		}

	}

	$("#searchBar").keypress(function(event) {
  if ( event.which == 13 ) {
     searchMovie($("#searchBar").val());
   }
});


	 $("#submitBut").click(function () {
        searchMovie($("#searchBar").val());
        });

	 $( "#submitBut" ).tooltip({
      show: {
        effect: "slideDown",
        delay: 100,
        duration: 500
      }
    });

	 $( "#submitBut" ).tooltip({
      hide: {
        effect: "explode",
        delay: 100,
        duration: 500
      }
    });

	  $( "#searchBar" ).tooltip({
      show: {
        effect: "scale",
        delay: 100,
        duration: 500
      }
    });

	 $( "#searchBar" ).tooltip({
      hide: {
        effect: "pulsate",
        delay: 100,
        duration: 500
      }
    });

});