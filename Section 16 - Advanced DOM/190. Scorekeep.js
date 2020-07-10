//
// Displaying the correct score
//

	var p1Display = document.querySelector("#p1s");
	var p2Display = document.querySelector("#p2s");
	var p1Button = document.querySelector("#p1");
	var p2Button = document.getElementById("p2");
	var winningScore = 5;
	var gameOver = false;

	p1Button.addEventListener("click", function(){
		if(!gameOver) {
		 p1Score ++;
		 p1Display.textContent = p1Score;
		 if(p1Score === winningScore){
		 	p1Display.classList.add("winner");
		 	gameOver = true;
		 	console.log("GAMEOVER");
		 }
	}
})

	p2Button.addEventListener("click", function(){
		if(!gameOver) {
		 p2Score ++;
		 p2Display.textContent = p2Score;
		 if(p2Score === winningScore){
		 	p2Display.classList.add("winner");
		 	gameOver = true;
		 	console.log("GAMEOVER");
		 }
	}
})

//
// Setting up the reset button
//

	var resetButton = document.querySelector("#reset");
	var p1Score = 0;
	var p2Score = 0;

function reset() {
			p1Score = 0;
		p2Score = 0;
		p1Display.textContent = p1Score;
		p2Display.textContent = p2Score;
		p1Display.classList.remove("winner");
		p2Display.classList.remove("winner");
		gameOver = false;
}

	resetButton.addEventListener("click", function(){
		reset();
	})

//
// Changing the playing to to the correct maximum amount
//

	var maxScoreInput = document.querySelector("#maxscoreinput")
	var playingTo = document.querySelector("#playingto")

	maxScoreInput.addEventListener("change", function(){
		playingTo.textContent = maxScoreInput.value;
		winningScore = Number(maxScoreInput.value);
		reset();
	})



