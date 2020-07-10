
// How to manipulate a H1 using Javascript

// Select it

var h1 = document.querySelector("h1")

// Manipulate it

h1.style.color = "pink";


// EXAMPLE 2 - BLUE FLASHING ANIMATION

var body = document.querySelector ("body") // SELECT
var isBlue = false;

setInterval(function(){
if(isBlue) {
	body.style.background = "white";
} else {
	body.style.background = "blue";
}
isBlue = !isBlue;
},1000);
