// getElementById

var tag = document.getElementById("highlight"); // selects us the HTML/CSS ID called Highlight

// getElementsByClassName

var tags = document.getElementsByClassName("bolded"); // selects us the HTML/CSS Classes called Bolded
// In console, gives you a node list - not an array.

//getElementsByTagName

var tags = document.getElementsByTagName("li");
console.log(tags[0]);

// querySelector

var tag = document.querySelector("#highlight");

var tag = document.querySelector(".bolded"); // only gives us the very first match

// querySelectorAll - returns all, rather than the first element unlike querySelector without the all

var tag = document.querySelectorAll(".bolded"); // can also use this if there is simply one element.