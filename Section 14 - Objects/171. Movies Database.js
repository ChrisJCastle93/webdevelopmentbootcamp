// Attempt 1 

var Movies = [
        {title: "The Departed", stars: 4, hasWatched: false},
        {title: "The Lion King", stars: 5, hasWatched: true},
]
;


Movies.forEach(function(movie) {

if(movie.hasWatched) {
	console.log("You have watched " + movie.title + " - " + movie.stars + " stars");
} else{console.log("You have not seen " + movie.title + " - " + movie.stars + " stars");}

});


// Attempt 2


var Movies = [
        {title: "The Departed", stars: 4, hasWatched: false},
        {title: "The Lion King", stars: 5, hasWatched: true},
]
;

Movies.forEach(function(film) {
	var result = "You have ";
	if(film.hasWatched){
		result += "watched ";
	} else {
		result += "have not seen ";
	}
	result += film.title + " - ";
	result += film.stars + " stars."
	console.log(result)
});