// PRINT NUMBERS FROM -10 TO 19

var num = -10;

while(num<20){
    console.log(num);
    num++;
}

// PRINT EVEN NUMBERS FROM 10 TO 40

var num = 10;

while(num<=40){
    console.log(num);
    num+=2;
}

// PRINT ODD NUMBERS FROM 300 TO 333

var num = 300;

while(num<334){
    if(num%2!===0){console.log(num)}; 
    num++;
}

// PRINT ALL NUMBERS DIVISIBLE BY 5 AND 3 BETWEEN 5 & 50

var num = 5;

while(num<=50){
    if(num%5===0 && num%3===0){console.log(num)}; 
    num++;
}

// if (condition1) {
    //  block of code to be executed if condition1 is true
//  } else if (condition2) {
    //  block of code to be executed if the condition1 is false and condition2 is true
//  } else {
    //  block of code to be executed if the condition1 is false and condition2 is false
//  }