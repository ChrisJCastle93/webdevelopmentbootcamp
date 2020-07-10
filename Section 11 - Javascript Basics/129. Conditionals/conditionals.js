var age = prompt("Oi, how old are you?")

if(age<0){console.log("Error")}

if(age<21){console.log("underage")}
else if(age==21){console.log("Happy Birthday")}
else {console.log("you may enter and drink")}

if(age%2==0){console.log("even number")}
else{console.log("odd number")}

if(Number.isInteger((Math.sqrt(age)))){console.log("Perfect Square")}

// if (condition1) {
    //  block of code to be executed if condition1 is true
//  } else if (condition2) {
    //  block of code to be executed if the condition1 is false and condition2 is true
//  } else {
    //  block of code to be executed if the condition1 is false and condition2 is false
//  }