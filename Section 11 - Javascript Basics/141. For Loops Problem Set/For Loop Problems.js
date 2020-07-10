console.log("PRINT NUMBERS FROM -10 TO 19")

for(var num = -10; num < 20; num++){
    console.log(num);
}

console.log("PRINT EVEN NUMBERS FROM 10 TO 40")

for(var num = 10; num < 41; num+=2){
    console.log(num);
}

console.log("PRINT ODD NUMBERS FROM 300 TO 333")

for(var num = 300; num < 334; num++){
    if(num%2!==0){console.log(num)};
}

console.log("PRINT ALL NUMBERS DIVISIBLE BY 5 AND 3 BETWEEN 5 & 50")

for(var num = 5; num < 51; num++){
    if(num%5==0 && num%3==0){console.log(num)};
}

// if (condition1) {
    //  block of code to be executed if condition1 is true
//  } else if (condition2) {
    //  block of code to be executed if the condition1 is false and condition2 is true
//  } else {
    //  block of code to be executed if the condition1 is false and condition2 is false
//  }