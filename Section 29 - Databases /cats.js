//OG SET UP

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// CREATE CAT SCHEMA

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// adding new cat to the DB

// var George = new Cat ({
//     name: "George",
//     age: 11,
//     temperament: "Grouchy"
// });

// George.save(function(err, cat){
//     if(err){
//         console.log("SOMETHING WENT WRONG")
//     } else {
//         console.log("SAVED CAT");
//         console.log(cat);
//     }
// });

Cat.create({
    name: "Snow White",
    age: 15,
    temperent: "Bland"
}, function(err, cat){
    if(err){
        console.log("ERROR");
        console.log(err);
    } else {
        console.log("Cat Created");
        console.log(cat);
    }
});

// retrieve all cats from the DB and console.log each one.

// Cat.find({}, function(err, cats){
//     if(err){
//         console.log("ERROR");
//         console.log(err);
//     } else {
//         console.log("ALL THE CATS....");
//         console.log(cats);
//     }
// });