var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.render("home.ejs");
})

// EJS = embedded Javascript. Let's us embed Javascript in there.

// /fallinlovewith/rusty
//   "you fell in love with rusty"
// /fallinlovewith/pomsky
//   "you fell in love with pomsky"

// app.get("/fallinlovewith/:thing", function(req, res){
//   var thing = req.params.thing;
//   res.send("you fell in love with " + thing)
// })

// RENDERING AN EJS FILE

// app.get("/fallinlovewith/:thing", function(req, res){
//   var thing = req.params.thing;
//   res.render("love.ejs");
// });

// RENDERING AN EJS FILE WITH A JAVASCRIPT VARIABLE IN IT

app.get("/fallinlovewith/:thing", function(req, res){
  var thing = req.params.thing;
  res.render("love.ejs", {thingVar: thing});
});

//SERVER LISTEN
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});