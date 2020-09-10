// TO START MONGODB USING HOMEBREW USE THIS: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
// brew services start mongodb-community@4.4

// npm init
// npm install express mongoose --save
// npm install passport passport-local --save
// npm install passport-local-mongoose --save
// npm install ejs --save
// npm install body-parser express-session --save
// npm install passport passport-local passport-local-mongoose express-session --save
// npm install connect-flash
// npm install method-override --save


// SECTION 38
// REFACTORED MIDDLEWARE
// CREATING FLASH MESSAGES

////////////// REQUIRES //////////////////

var express                 = require("express"), 
    app                     = express(),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    Campground              = require("./models/campground.js"),   
    Comment                 = require("./models/comment"),       
    seedDB                  = require("./seeds");      
    User                    = require("./models/user"),             // THESE 3x REQUIRED FOR AUTHENTIFICATION
    localStrategy           = require("passport-local"),
    methodOverride          = require("method-override"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    flash                   = require("connect-flash");

var commentRoutes           = require("./routes/comments"),         // SPLITTING THE ROUTES INTO DIFFERENT FILES TO TIDY UP
    indexRoutes             = require("./routes/index"),           // SPLITTING THE ROUTES INTO DIFFERENT FILES TO TIDY UP
    campgroundRoutes        = require("./routes/campgrounds");      // SPLITTING THE ROUTES INTO DIFFERENT FILES TO TIDY UP

///////////// OG SET UP //////////////////

// seedDB();  //SEED THE DATABASE PAUSED WHILST WE ARE MANUALLY CREATING                                         // SEEDING DB AT THE START

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var url = "mongodb://localhost/yelp_camp_v10";
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
app.use(flash());   
app.use(passport.initialize());                     // NEXT 5 LINES COPIED FROM THE LAST LECTURE
app.use(passport.session());                        
app.use(methodOverride("_method"))                                // USING FLASH-CONNECT                    

passport.use(new localStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());       
passport.deserializeUser(User.deserializeUser());  

app.use(function(req, res, next){               // CREATING OUR OWN MIDDLEWARE TO USE LOGIC JUMPS
    res.locals.currentUser = req.user;          // GRABS USER DATA. IF THERE IS NO USER, IT WILL BE EMPTY
    res.locals.error = req.flash("error");    // ADDS IN FLASH MESSAGE ON EVERY PAGE IF NEEDED
    res.locals.success = req.flash("success");    // ADDS IN FLASH MESSAGE ON EVERY PAGE IF NEEDED
    next();                                     // MOVES IT ON
});

app.use("/campgrounds/:id/comments", commentRoutes);                         // CALLING THE ROUTES FROM THE OTHER FILES AND RUNNING THEM
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);

//////////////// SERVER LISTEN /////////////////////

// var port = process.env.PORT || 3000;
// app.listen(port, function () {
//   console.log("Yelpcamp Server has started!");
// });

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});