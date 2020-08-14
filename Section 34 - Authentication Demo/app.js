// npm install express mongoose --save
// npm install passport passport-local --save
// npm install passport-local-mongoose --save
// npm install ejs --save
// npm install body-parser express-session --save
// npm install passport passport-local passport-local-mongoose express-session --save

// SET UP //

var mongoose                = require("mongoose");
var express                 = require("express");
var passport                = require("passport");
var bodyParser              = require("body-parser");
var User                    = require("./models/user");
var localStrategy           = require("passport-local");
var passportLocalMongoose   = require("passport-local-mongoose")

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var url = "mongodb://localhost/auth_demo_app";
mongoose.connect(url, function(err, db){
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({                // 
    secret: "Rusty is the best",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());                     // NEEDS TO BE ADDING WHENEVER RUNNING
app.use(passport.session());                        // NEEDS TO BE ADDED WHENEVER RUNNING

passport.use(new localStrategy(User.authenticate())); // METHOD THAT's GIVEN TO US TO AUTHENTICATE
passport.serializeUser(User.serializeUser());       //READ THE SESSION, ENCODING. Tells it to use data that's already in USER. 
passport.deserializeUser(User.deserializeUser());   //READ THE SESSION, DECODING

///////////// ROUTES ////////////////////

app.get("/", function(req,res){
    res.render("home");
});

app.get("/secret",isLoggedIn, function(req,res){               // NEED TO CHECK IF USER LOGGED IN. isLoggedIn function at bottom of page
    res.render("secret");
});

// AUTH ROUTES

app.get("/register", function(req, res){
    res.render("register");
})

app.post("/register", function(req, res){                       // HANDLES USER SIGNUP FORM
    User.register(new User({username: req.body.username}), req.body.password, function(err,user){       // PASSWORD ISN'T SAVED TO DATABASE, WE PASS PASSWORD IN TO THE SECOND ARGUMENT TO USER.REGISTER - IT WILL HASH THAT PASSWORD AND STORE IN DATABASE TO PROTECT SECURITY. WILL RETURN A USERNAME WITH HASH PASSWORD
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){      // AUTHENTICATING USING PASSPORT LOCAL
            res.redirect("/");
        });
    });
});

// LOGIN ROUTES

app.get("/login", function(req, res){
    res.render("login");
})

app.post("/login", passport.authenticate("local", {     // CHECKS THE CREDENTIALS
    successRedirect: "/secret",                         // ITS MIDDLEWARE. RUNS IN THE MIDDLE OF ROUTE
    failureRedirect: "/login"
}), function(req, res){           
});

// LOGOUT ROUTES

app.get("/logout", function(req, res){
    req.logout();                                       // STRAIGHTFORWARD LOGOUT req.
    res.redirect("/");
})

// isLoggedIn function

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
};


//////////////// SERVER LISTEN /////////////////////

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Yelpcamp Server has started!");
});