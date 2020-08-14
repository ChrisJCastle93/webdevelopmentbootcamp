// TO START MONGODB USING HOMEBREW USE THIS: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

////////////// REQUIRES //////////////////

var express     = require("express"), 
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground.js"),   // PULLING FROM THE NEWLY SEPARATED FILE
    Comment     = require("./models/comment"),       // NEW FILES TO BE CREATED
    // User        = require("./models/user"),          // NEW FILES TO BE CREATED
    seedDB      = require("./seeds");       // NEW FILE CREATED IN LEC 331

///////////// OG SET UP //////////////////

seedDB();                                           // SEEDING DB AT THE START

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var url = "mongodb://localhost/yelp_camp";
mongoose.connect(url, function(err, db){
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(express.static(__dirname + "/public")); // tells express where to look for stylesheets
app.set("view engine", "ejs");      // removes need to add ejs to files
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

////////////// RESTFUL ROUTES /////////////////////////////


//REST = INDEX ROUTE

app.get("/campgrounds", function(req, res){
// WE WANT TO GET ALL CAMPGROUNDS THEN RENDER THE CAMPGROUND FILE
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

app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new.ejs");
});

////////////////////

//REST - SHOW - OPEN UP PRODUCT DETAILS

app.get("/campgrounds/:id", function(req, res){
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

app.post("/campgrounds", function(req, res){
    var searchterm = req.body.searchterm;
    var imglink = req.body.imglink;
    var campdescription = req.body.campdescription;
    var newCampground = {name: searchterm, image: imglink, description: campdescription};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds") //REDIRECT TO CAMPGROUNDS
        }
    })
});

///////////////////

// =============================
// COMMENTS ROUTES
// =============================

app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){           // FIND CAMPGROUND BY ID
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});           // RENDER A NEW COMMENT PAGE OFF THE BACK OF THAT ID
        }
    }) 
});

app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){                  // LOOKUP CAMPGROUND USING ID
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){    // req.body.comment IS PROPERTY OF WHAT IS SUBMITTED FROM THE FORM, BECAUSE WE USED COMMENT[PROPERTY] AS THE NAMES
            if(err){                                                        // Comment.create uses the required comment.js file we created, then creates a comment based on the function here.   
                console.log(err);
            } else {
                campground.comments.push(comment);                      // PUSHES THE NEW COMMENT THAT WAS SUBMITTED BY THE FORM INTO THE COMMENTS OF THE CAMPGROUND IT WAS SUBMITTED FROM
                campground.save();                                          // SAVES DATA
                res.redirect("/campgrounds/" + campground._id);             // REDIRECTS TO THE CAMPGROUND'S SHOW PAGE USING THE ID
            }; // else
            }); // Comment.create
        }; // else
    }); //Campground.findById
}); //app.post

////////////////////////////////////////////////////

//////////////// SERVER LISTEN /////////////////////

var port = process.env.PORT || 2900;
app.listen(port, function () {
  console.log("Yelpcamp Server has started!");
});