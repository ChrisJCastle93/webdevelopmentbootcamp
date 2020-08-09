var express     = require("express"), 
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

//OG SET UP
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var url = "mongodb://localhost/yelp_camp";
mongoose.connect(url, function(err, db){
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// TO START MONGODB USING HOMEBREW USE THIS: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

app.set("view engine", "ejs");      // removes need to add ejs to files
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// SCHEMA SETUP
//Define - tells us what a campground should look like
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
//Exporting - takes the schema blueprint for what it should look like, and gives us a model where we can use things like find and create
var Campground = mongoose.model("Campground", campgroundSchema);

// //CREATING NEW CAMPGROUND IN DATABASE MANUALLY
// Campground.create(
//     {
//         name: "Salmon Creek",
//         image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
//         description: "nice site"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     });

// CAMPGROUNDS OBJECT TO START THINGS OFF
                    //THESE WERE OUR STARTER CAMPGROUNDS, THEN WE REPLACED THE ARRAY WITH ONES THAT WE POSTED
                    // var campgrounds = [
                    //     {name: "Massasauga", image: "http://www.tonydegroot.com/Trip/Pics/_DSC4718_19_20PMHDR.jpg"},
                    //     {name: "Killarney", image: "http://www.killarneyoutfitters.com/photos/700px/Hike_the_Crack_Killarney_park_paradise_found_700.jpg" },
                    //     {name: "Kawartha", image: "https://kathrynanywhere.com/wp-content/uploads/2019/10/IMG_1299-768x576.jpg"}
                    // ];

app.get("/", function(req, res){
    res.render("template");
})


//REST = INDEX ROUTE
app.get("/campgrounds", function(req, res){
// WE WANT TO GET ALL CAMPGROUNDS THEN RENDER THE CAMPGROUND FILE
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    })
});

//REST - NEW - SHOW FORM TO ADD NEW CAMPGROUND
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

//REST - SHOW - OPEN UP PRODUCT DETAILS
app.get("/campgrounds/:id", function(req, res){
    //FIND CAMPGROUND BY ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground}) //RENDER SHOW TEMPLATE WITH THAT BACKGROUND
        }
    })
})

//REST - CREATE - ADD NEW CAMPGROUND TO DB
app.post("/campgrounds", function(req, res){
    var searchterm = req.body.searchterm;
    var imglink = req.body.imglink;
    var campdescription = req.body.campdescription;
    var newCampground = {name: searchterm, image: imglink, description: campdescription};
    //campgrounds.push({name: searchterm, image: imglink}); <--- This is the old way of adding a campground (from the form on the page), that was hardcoded into campgrounds array.
    //CREATE NEW CAMPGROUND AND ADD TO DATABASE
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds") //REDIRECT TO CAMPGROUNDS
        }
    })
});

// // `http://www.omdbapi.com/?s=${query}&apikey=thewdb`

// app.get("/", function(req, res){
//     res.render("search");
// });

// app.get("/results", function(req, res){
//     console.log(req.query.search);
//     var searchterm = req.query.search;
//     request("http://www.omdbapi.com/?s=" + searchterm + "&apikey=thewdb", function(error, response, body){
//         if(!error && response.statusCode == 200){
//             var data = JSON.parse(body);
//             res.render("results", {data: data});
//         }      
//     });
// });

//SERVER LISTEN
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Yelpcamp Server has started!");
});