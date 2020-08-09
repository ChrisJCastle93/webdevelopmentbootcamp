var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var friends = ["Harry", "Ron", "Hermione", "Hagrid", "Snape",]

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home");
});


app.get("/friends", function(req, res) {
    res.render("friends", {friends: friends});
});

app.post("/addfriend", function(req, res) {
    var newFriend = req.body.newfriend; //MUST DOWNLOAD NPM PACKAGE BODY PARSER AND REQUIRE AT TOP // THE newfriend part is from the form attribute 
    friends.push(newFriend);
    res.redirect("/friends")
});

//SERVER LISTEN
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});