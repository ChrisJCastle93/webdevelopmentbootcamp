var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".squares")
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

for(var i = 0; i < modeButtons.length; i++) {
	modeButtons[i].addEventListener("click", function() {
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");
		if(this.textContent === "EASY"){
			numSquares = 3;
		} else {
			numSquares = 6;
		}
		reset();
	});
}

for(var i = 0; i < squares.length; i++) {
	squares[i].style.backgroundColor = colors[i];
	squares[i].addEventListener("click", function() {
		var clickedColor = this.style.backgroundColor; 
		if(clickedColor === pickedColor) {
			messageDisplay.textContent = "Correct!";
			resetButton.textContent = "Play Again";
			changeColors(clickedColor);
			console.log(clickedColor, pickedColor)
			h1.style.backgroundColor = clickedColor;
		} else {
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again";
		}
	});
}

function reset() {
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	for(var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		};
	};
	h1.style.backgroundColor = "steelblue";	
};

// easyBtn.addEventListener("click", function(){
// 	hardBtn.classList.remove("selected");
// 	easyBtn.classList.add("selected");
// 	numSquares = 3;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for(var i = 0; i < squares.length; i++) {
// 		if(colors[i]){
// 			squares[i].style.backgroundColor = colors[i];
// } 	 else {
// 			squares[i].style.display = "none";			
// 		}
// 	}
// });

// hardBtn.addEventListener("click", function(){
// 	easyBtn.classList.remove("selected");
// 	hardBtn.classList.add("selected");
// 	numSquares = 6;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for(var i = 0; i < squares.length; i++) {
// 		squares[i].style.backgroundColor = colors[i];
// 		squares[i].style.display = "block";			
// 		}
// 	});

resetButton.addEventListener("click", function() {
// 	//generate brand new colors
// 	colors = generateRandomColors(numSquares);
// 	//pick a new random color from array
// 	pickedColor = pickColor();
// 	//change colorDisplay to match picked color
// 	colorDisplay.textContent = pickedColor;
// 	//change color of squares
// 	for(var i = 0; i < squares.length; i++) {
// 	squares[i].style.backgroundColor = colors[i];
// }
// 	h1.style.backgroundColor = "steelblue";
// 	resetButton.textContent = "New Colors";
// 	messageDisplay.textContent = "";
// 	});
reset();
});

colorDisplay.textContent = pickedColor

function changeColors(colors) {
	for(var i = 0; i < squares.length; i++) {
	squares[i].style.backgroundColor = colors;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	// make an array
	var arr = [];
	//	repeat num times
	for(var i = 0; i < num; i++) {
	//get random color and push into array
	arr.push(randomColor());
	}
	// return that array
	return arr;
}

function randomColor(){
	//pick a red
	var red = Math.floor(Math.random()*256)
	//pick a green
	var green = Math.floor(Math.random()*256)
	//pick a blue
	var blue = Math.floor(Math.random()*256)
	return "rgb(" + red + ", " + green + ", " + blue + ")"
};
