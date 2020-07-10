
// REVERSE LENGTH SET 

var array = [1,2,3,4,5];
var arrayLength = array.length;

console.log("**START**")
printReverse();
console.log("*END*")

function printReverse() {
    for(i=arrayLength; i >= 0; i--) {
    console.log(array[i]);
}
}

// UNIFORM SET // CREATE LOOP THAT COMPARES THE FIRST VALUE WITH EACH OTHER VALUE

function isUniform(arr){
 var first = arr[0];
 for(i=1; i < arr.length; i++) {
    if(arr[i] !== first){
        return false;
    }
 }
 return true
}

// SUM ARRAYS SET // CREATE LOOP THAT SUMS ARRAY

function sumArray(arr){
 var results = 0;
 arr.forEach(function(element){
 	results += element;
});
 return results;
}

function sumArray(arr){
 var results = arr[0];
 for(i=1; i < arr.length; i++) {
 	results += arr[i];
};
 return results;
}

// MAX ARRAYS SET // WRITE FUNCTION THAT RETURNS HIGHEST NUMBER

function max(arr){
 var max = arr[0];
 for(i=1; i < arr.length; i++) {
 	if(arr[i]>max){
 	max = arr[i];
}
}
return max;
}
