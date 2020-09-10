// ALL THE REST CAMPGROUNDS ROUTES
// REPLACED app. with router. throughout
// ADD module.export to the bottom

var express = require("express"); // MUST REQUIRE AGAIN IN THIS FILE
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");   // Campground AND Comment not defined in this doc, so need to link them
var Comment = require("../models/comment");

// =============================
// COMMENTS ROUTES
// =============================

// COMMENTS NEW FORM

router.get("/new", isLoggedIn, function(req, res){    // ADDED isLoggedIn FUNCTION TO FORCE USERS TO SIGN IN
    Campground.findById(req.params.id, function(err, campground){           // FIND CAMPGROUND BY ID
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});           // RENDER A NEW COMMENT PAGE OFF THE BACK OF THAT ID
        }
    }) 
});

// COMMENTS CREATE

router.post("/", isLoggedIn, function(req, res){       // ADDED isLoggedIn FUNCTION TO FORCE USERS TO SIGN IN
    Campground.findById(req.params.id, function(err, campground){           // LOOKUP CAMPGROUND USING ID
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){    // req.body.comment IS PROPERTY OF WHAT IS SUBMITTED FROM THE FORM, BECAUSE WE USED COMMENT[PROPERTY] AS THE NAMES
            if(err){                                                        // Comment.create uses the required comment.js file we created, then creates a comment based on the function here.   
                console.log(err);
            } else {
                // add username and id to comment
                // req.user            // CONTAINS THE INFORMATION .username req.user._id;
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save(); //SAVES DATA
                campground.comments.push(comment);                      // PUSHES THE NEW COMMENT THAT WAS SUBMITTED BY THE FORM INTO THE COMMENTS OF THE CAMPGROUND IT WAS SUBMITTED FROM
                campground.save();                                          // SAVES DATA
                res.redirect("/campgrounds/" + campground._id);             // REDIRECTS TO THE CAMPGROUND'S SHOW PAGE USING THE ID
            };
            });
        };
    });
});

// isLoggedIn function - COPIED ACROSS FROM INDEX.JS TO WORK IN THIS FILE TOO

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
};


////////////////////////////////////////////////////

module.exports = router;