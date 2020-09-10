// ALL THE REST CAMPGROUNDS ROUTES
// REPLACED app. with router. throughout
// ADD module.export to the bottom

var express = require("express"); // MUST REQUIRE AGAIN IN THIS FILE
var router  = express.Router({mergeParams: true});  // merge params line fixes the 'null' issues
var Campground = require("../models/campground");   // Campground AND Comment not defined in this doc, so need to link them


// ======================
// REST ROUTES
// ======================

//REST = INDEX ROUTE

router.get("/", function(req, res){                                 
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    })
});

////////////////////

//REST - NEW - SHOW FORM TO ADD NEW CAMPGROUND

router.get("/new", isLoggedIn, function(req, res){          //REMOVED /campgrounds as it's now in the path in the app.js file
    res.render("campgrounds/new.ejs");
});

////////////////////

//REST - SHOW - OPEN UP PRODUCT DETAILS

router.get("/:id", function(req, res){
    //FIND CAMPGROUND BY ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){                  // PREV:  Campground.findById(req.params.id, function(err, foundCampground){  
        if(err){                                                                                                  // EXPLAINER: FINDING CAMPGROUND BY ID, POPULATING THE COMMENTS, THEN EXECUTING THE FUNCTION
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground})                                                     //RENDER SHOW TEMPLATE WITH THAT BACKGROUND
        }
    })
})

////////////////////

//REST - CREATE - ADD NEW CAMPGROUND TO DB

router.post("/", isLoggedIn, function(req, res){
    var searchterm = req.body.searchterm;
    var imglink = req.body.imglink;
    var campdescription = req.body.campdescription;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: searchterm, image: imglink, description: campdescription, author: author};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/campgrounds") //REDIRECT TO CAMPGROUNDS
        }
    })
});


// isLoggedIn function - COPIED ACROSS FROM INDEX.JS TO WORK IN THIS FILE TOO

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
};


///////////////////

module.exports = router;