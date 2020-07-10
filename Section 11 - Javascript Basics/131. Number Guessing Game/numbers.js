alert("WORKING")

//create secretNumber
var secretNumber = 4;

//ask user for guess
var guess = prompt("Oi, guess a number between 1 and 50?");

//check guess
if(Number(guess) === secretNumber) {
    alert("you got it right!");
}
// Otherwise check if higher
else if(Number(guess)>secretNumber){
    alert("Too high. Guess Again!");
}
// Otherwise check if lower
else {
    alert("Too low. Guess again!");
}




// if (condition1) {
    //  block of code to be executed if condition1 is true
//  } else if (condition2) {
    //  block of code to be executed if the condition1 is false and condition2 is true
//  } else {
    //  block of code to be executed if the condition1 is false and condition2 is false
//  }