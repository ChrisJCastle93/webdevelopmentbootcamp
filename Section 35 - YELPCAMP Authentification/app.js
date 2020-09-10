// TO START MONGODB USING HOMEBREW USE THIS: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

// npm install express mongoose --save
// npm install passport passport-local --save
// npm install passport-local-mongoose --save
// npm install ejs --save
// npm install body-parser express-session --save
// npm install passport passport-local passport-local-mongoose express-session --save

////////////// REQUIRES //////////////////

var express     = require("express"), 
    app         = express(),
    passport    = require("passport"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground.js"),   
    Comment     = require("./models/comment"),       
    seedDB      = require("./seeds");      
    User                    = require("./models/user"),             // THESE 3x REQUIRED FOR AUTHENTIFICATION
    localStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose");

///////////// OG SET UP //////////////////

seedDB();                                           // SEEDING DB AT THE START

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var url = "mongodb://localhost/yelp_camp_v6";
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
app.use(require("express-session")({                // REQUIRE EXPRESS SESSION FOR AUTH PURPOSES
    secret: "Rusty is the best",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());                     // NEXT 5 LINES COPIED FROM THE LAST LECTURE
app.use(passport.session());                        

passport.use(new localStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());       
passport.deserializeUser(User.deserializeUser());  

app.use(function(req, res, next){               // CREATING OUR OWN MIDDLEWARE TO USE LOGIC JUMPS
    res.locals.currentUser = req.user;          // GRABS USER DATA. IF THERE IS NO USER, IT WILL BE EMPTY
    next();                                     // MOVES IT ON
});

// ======================
// REST ROUTES
// ======================

//REST = INDEX ROUTE

app.get("/campgrounds", function(req, res){
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

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){    // ADDED isLoggedIn FUNCTION TO FORCE USERS TO SIGN IN
    Campground.findById(req.params.id, function(err, campground){           // FIND CAMPGROUND BY ID
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});           // RENDER A NEW COMMENT PAGE OFF THE BACK OF THAT ID
        }
    }) 
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){       // ADDED isLoggedIn FUNCTION TO FORCE USERS TO SIGN IN
    Campground.findById(req.params.id, function(err, campground){           // LOOKUP CAMPGROUND USING ID
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


// =======================
// AUTH ROUTES
// =======================

app.get("/register", function(req, res){
    res.render("register");
})

app.get("/secret",isLoggedIn, function(req,res){               // NEED TO CHECK IF USER LOGGED IN. isLoggedIn function at bottom of page
    res.render("secret");
});

app.post("/register", function(req, res){                               // HANDLES USER SIGNUP FORM
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
    res.redirect("/campgrounds");
})

// isLoggedIn function

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
};

//////////////// SERVER LISTEN /////////////////////

var port = process.env.PORT || 2800;
app.listen(port, function () {
  console.log("Yelpcamp Server has started!");
});