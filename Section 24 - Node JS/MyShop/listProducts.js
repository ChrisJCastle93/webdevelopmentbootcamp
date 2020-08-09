var faker = require('faker');

console.log("==================")
console.log("WELCOME TO MY SHOP")
console.log("==================")
for(i=0; i<10; i++) {
var price = faker.commerce.price(); 
var product = faker.commerce.productName(); 
console.log(product + " - $" + price);
};