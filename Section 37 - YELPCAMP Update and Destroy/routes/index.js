// ALL THE REST CAMPGROUNDS ROUTES
// REPLACED app. with router. throughout
// ADD module.export to the bottom

var express                 = require("express"); // MUST REQUIRE AGAIN IN THIS FILE
var router                  = express.Router();
var passport                = require("passport");
var User                    = require("../models/user");             // MOVED PASSPORT AND USER OVER FROM APP.JS

router.get("/", function(req, res){
    res.render("landing");
})


// =======================
// AUTH ROUTES
// =======================

router.get("/register", function(req, res){
    res.render("register");
})

router.get("/secret",isLoggedIn, function(req,res){               // NEED TO CHECK IF USER LOGGED IN. isLoggedIn function at bottom of page
    // res.render("secret");
    res.redirect("/campgrounds");
});

router.post("/register", function(req, res){                               // HANDLES USER SIGNUP FORM
    var newUser = new User({username: req.body.username});              // CLEANING UP BY ADDING IN VARIABLE
    User.register(newUser, req.body.password, function(err,user){       // PASSWORD ISN'T SAVED TO DATABASE, WE PASS PASSWORD IN TO THE SECOND ARGUMENT TO USER.REGISTER - IT WILL HASH THAT PASSWORD AND STORE IN DATABASE TO PROTECT SECURITY. WILL RETURN A USERNAME WITH HASH PASSWORD
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){      // AUTHENTICATING USING PASSPORT LOCAL
            res.redirect("/campgrounds");
        });
    });
});

// LOGIN ROUTES

router.get("/login", function(req, res){
    res.render("login");
})

router.post("/login", passport.authenticate("local", {     // CHECKS THE CREDENTIALS
    successRedirect: "/secret",                         // ITS MIDDLEWARE. RUNS IN THE MIDDLE OF ROUTE
    failureRedirect: "/login"
}), function(req, res){           
});

// LOGOUT ROUTES

router.get("/logout", function(req, res){
    req.logout();                                       // STRAIGHTFORWARD LOGOUT req.
    res.redirect("/campgrounds");
})

// isLoggedIn function

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
};

//////////////

module.exports = router;