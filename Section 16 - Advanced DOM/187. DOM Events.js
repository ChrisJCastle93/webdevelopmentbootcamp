// EVENT PROCESS

	// LISTENENER - waits for an event like click, hover, keypress

// SYNTAX

	// element.addEventListener(type, fuctionToCall);

	// var button = document.querySelector("button");
	// button.addEventListener(click, function() {
	// console.log("SOMEONE CLICKED THE BUTTON!")
	// });


// EXAMPLE: Changing the background color of h1

	// h1.addEventListener(click, function() {
	// h1.style.background = "red";
	// });

	// Can have more than one DOM manipulation - they build on top of each other.


// Change Background Color on Button Click between white and purple

	// HTML Starter Code: <button> CLICK ME </button>

	var button = document.querySelector("button");
	var body = document.querySelector("body");
	var isPurple = false;

	button.addEventListener("click", function(){
		if(isPurple) {
			body.style.background = "white";
			isPurple = false
		} else { 
			body.style.background = "purple"
			isPurple = true
		};
	});


	// USE CLASS LIST. Assume made CSS Class called 'purple' that changed the background color.

		button.addEventListener("click", function(){
		document.body.classList.toggle("purple")
		})
	