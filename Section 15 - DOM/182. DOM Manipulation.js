// SELECT

var tag = document.getElementById("highlight");

// MANIPULATE - var.style.css = "color/border blah blah"

tag.style.color = "blue"; // right side MUST be a string

// SEPARATION OF CONCERNS - Structure, Behaviour, and Presentation. HTML does structure, presentation/style is CSS, Javascript is behaviour.
	// common pattern is to define a CSS class, then toggle it on or off with Javascript.


// CLASS LIST

var.classList.add // adds a class to an element. Var is is variable using the elements you have selected using the selectors.
.remove
.toggle // useful for things like to-do lists where you want to strikethrough on and off when completing a task

// TEXT CONTENT

tag.textContent // returns the pure text/string ONLY, that's in the tag element.
tag.textContent = "STRING" // Alters the text content in the original space.

tag.innerHTML // brings back the text plus html within the tag element, eg <strong> elements


// ATTRIBUTES
getAttribute();
getAttribute();

	//HTML
	// <a href="www.google.com"> I AM A LINK</a>
	
var link = document.querySelector("a")
link.getAttribute("href"); // selects Google link in HTML
link.setAttribute("href", "www.dogs.com"); // changes that to dogs.com

	//HTML
	// <img src="logo.png">

var link = document.querySelector("img")
link.getAttribute("src");
link.setAttribute("src", "dogs.png");

	// can only set attributes on single elements, but you can use loops to change multiple elements.

// USING LOOPS TO CHANGE ELEMENTS

var links = getElementByTagName("a");

for(var i = 0, i < links.length, i++) {;// FOR LOOP
	console.log(links[i].textContent);// Will print text content of all the different elements
}
//or
for(var i = 0, i < links.length, i++) {;// FOR LOOP
	links[i].style.background = "pink"; // will turn all links (a tags) pink
}

