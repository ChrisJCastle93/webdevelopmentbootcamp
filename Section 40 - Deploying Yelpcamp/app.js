// TO START MONGODB USING HOMEBREW USE THIS: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
// brew services start mongodb-community@4.4

// DB CONNECT //

// mongo "mongodb+srv://cluster0.xy1ej.mongodb.net/test" --username chrisjcastle

////////////// REQUIRES //////////////////

var express                 = require("express"), 
    dotenv                  = require('dotenv').config(),
    app                     = express(),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    Campground              = require("./models/campground.js"),   
    Comment                 = require("./models/comment"),       
    seedDB                  = require("./seeds"),      
    User                    = require("./models/user"),             
    localStrategy           = require("passport-local"),
    methodOverride          = require("method-override"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    flash                   = require("connect-flash"),
    expressSanitizer        = require('express-sanitizer'),
    commentRoutes           = require("./routes/comments"),         
    indexRoutes             = require("./routes/index"),            
    reviewRoutes            = require("./routes/reviews"),          
    campgroundRoutes        = require("./routes/campgrounds");


seedDB();  

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var url = process.env.DATABASEURL || "mongodb+srv://chrisjcastle:.Dougal22@cluster0.xy1ej.mongodb.net/test?retryWrites=true&w=majority";
// var url = ("mongodb://localhost:27017/yelpcamp_stripe")
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.set("view engine", "ejs");      
app.use(bodyParser.json() );       
app.use(bodyParser.urlencoded({    
  extended: true
})); 
app.use(require("express-session")({               
    secret: "Rusty is the best",
    resave: false,
    saveUninitialized: false,
}));
app.locals.moment = require('moment');
app.use(flash());
app.use(expressSanitizer());
app.use(passport.initialize());                    
app.use(passport.session());                        
app.use(methodOverride("_method"))                               

passport.use(new localStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());       
passport.deserializeUser(User.deserializeUser());  

app.use(async function(req, res, next){
  res.locals.currentUser = req.user;
  if(req.user) {
   try {
     let user = await User.findById(req.user._id).populate('notifications', null, { isRead: false }).exec();
     res.locals.notifications = user.notifications.reverse();
   } catch(err) {
     console.log(err.message);
   }
  }
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/campgrounds/:slug/comments", commentRoutes);
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:slug/reviews", reviewRoutes);

//////////////// SERVER LISTEN /////////////////////

var port = process.env.PORT || 3000; 
app.listen(port, function () {
  console.log("Server Has Started!");
});

// DEPLOYING

// GIT INIT
// GIT STATUS
// GIT ADD -A
// GIT COMMIT -m "MESSAGE"
// GIT STATUS
// heroku login
// heroku create
// heroku buildpacks:set heroku/nodejs// git push
// echo "node_modules" >> .gitignore
// git rm -r --cached node_modules
// git commit -am 'untracked node_modules'
// git push heroku master
// make sure package.json has start node app.js in it

// CALLING GOOGLE MAPS API KEY.... process.env.GEOCODER_API_KEY

process.on('warning', (warning) => {
  console.log(warning.stack);
});