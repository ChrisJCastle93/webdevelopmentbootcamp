var express = require("express");
var app = express();

// / => "hi there"
// /bye => "Goodbye!"
// /dog => "meow"

app.get("/", function(req, res){;
    res.send("Hi there!");
});

app.get("/bye", function(req, res){;
    res.send("Goodbye");
});

app.get("/dog", function(req, res){;
    res.send("meow");
});

app.get("*", function(req, res){;
    res.send("STARMAN");
});

// Tell Express to listen for requests (start server)

// app.listen(process.env.PORT, process.env.IP);

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});