var request = require('request');
var express = require('express');
var app = express();
app.set("view engine", "ejs");

// `http://www.omdbapi.com/?s=${query}&apikey=thewdb`

app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    console.log(req.query.search);
    var searchterm = req.query.search;
    request("http://www.omdbapi.com/?s=" + searchterm + "&apikey=thewdb", function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }      
    });
});

//SERVER LISTEN
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Movie App Has Started!");
});