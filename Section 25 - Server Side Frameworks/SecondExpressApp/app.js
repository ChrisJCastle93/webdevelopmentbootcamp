var express = require("express");
var app = express();

// BASIC REQUESTS

app.get("/", function(req, res){;
    res.send("Hi there, welcome to my assignment!");
});

// ROUTE REQUESTS

app.get("/speak/:animal", function(req, res){
    var sounds = {
        pig: "OINK",
        cow: "MOO",
        dog: "WOOF",
        cat: "I HATE HUMANS",
        goldfish: "plop plop",
};
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("The " + animal + " says '" + sound + "'")
});

//COMPLEX REQUESTS

app.get("/repeat/:word/:times", function(req,res) {
    var word =  req.params.word;            //GIVES US THE WORD IN URL
    var times = Number(req.params.times);   //GIVES US THE NUMBER IN URL
    var str = "";                           // STARTS STRING FOR RESPONSE
    
    for(var i = 0; i < times; i++){
        str += word + " ";
    }

    res.send(str);
});

// 404

app.get("*", function(req, res){;
    res.send("Sorry, page not found. What are you doing with your life?");
});

//SERVER LISTENERS

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});