var express     = require("express"), 
    app         = express(),
    methodOverride = require('method-override');
    bodyParser  = require("body-parser");
    expressSanitizer = require("express-sanitizer");
    mongoose    = require("mongoose");

app.use(express.static("public"));

//OG SET UP

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var url = "mongodb://localhost/blogs";
mongoose.connect(url, function(err, db){
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// TO START MONGODB USING HOMEBREW USE THIS: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
app.use(express.static("public"));  // tells express to look in the public folder for the stylesheets
app.use(methodOverride('_method')); // makes PUT and DELETE methods work
app.set("view engine", "ejs");      // removes need to add ejs to files
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(expressSanitizer()); // MUST GO AFTER BODY PARSER

// SCHEMA SETUP
//Define - tells us what a campground should look like
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
//Exporting - takes the schema blueprint for what it should look like, and gives us a model where we can use things like find and create
var Blog = mongoose.model("Blog", blogSchema);

///////////////RESTFUL ROUTES////////////////////////

//REST = INDEX ROUTE
app.get("/blogs", function(req, res){
        Blog.find({}, function(err, blogs){
            if(err) {
                console.log(err);
            } else {
                res.render("index", {blogs: blogs});
            }
        })
    });

/////////////////////////////////////////////

//REST - NEW - SHOW FORM TO ADD NEW BLOG
app.get("/blogs/new", function(req, res){
    res.render("new.ejs");
});

/////////////////////////////////////////////

//REST - CREATE - ADD NEW BLOG TO DB
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/blogs") //REDIRECT TO INDEX
        }
    })
});

/////////////////////////////////////////////

//REST - SHOW - OPEN UP BLOG DETAILS
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog}) //RENDER SHOW TEMPLATE WITH THAT BACKGROUND
        }
    })
});

/////////////////////////////////////////////

//REST - EDIT ROUTE - 
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog})
        }
    })
});

/////////////////////////////////////////////

//REST - UPDATE ROUTE - PUT METHOD
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){ //Blog.findByIdAndUpdate(id, newData, callback) - FINDS THE INFORMATION IN THE DATABASE AND REPLACES IT WITH NEW DATA
      if(err){
          res.redirect("/blogs");
      }  else {
          res.redirect("/blogs/" + req.params.id); //REDIRECTING TO THE BLOG PAGE WITH UPDATES - MAKES THE URL BLOG/ID
      }
   });
});

//NOTE: HTML FORMS DON'T SUPPORT PUT REQUESTS... SO IF YOU SUBMIT A FORM, IT WILL JUST GO IN THE URL
//WORKAROUND IS TO USE METHOD OVERRIDE
//AFTER EJS ON EDIT PAGE, IN FORM ACTION, ADD '?_method=PUT'
//UPDATE METHOD TO POST
// IN TERMINAL, DO npm install method-override --save
// ADD methodOverride = require("method-override"); 
// TO OG SETTINGS, add 'app.use(methodOverride("_method"));'

/////////////////////////////////////////////

//REST - DELETE ROUTE - DELETE METHOD
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err, updatedBlog){ //Blog.findByIdAndRemove(id, newData, callback) - FINDS THE INFORMATION IN THE DATABASE AND DESTROYS
       if(err){
           res.redirect("/blogs");
       }  else {
           res.redirect("/blogs/"); //REDIRECTING TO THE BLOG PAGES - THERE IS NO SHOW PAGE THAT WE DELETED
       }
    });
 });
 
 /////////////////////////////////////////////

//SERVER LISTEN
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Yelpcamp Server has started!");
});


/////////////// TOUCH UP NOTES ///////////////////

//  npm install express-sanitizer --save
// OG: expressSanitizer = require("express-sanitizer")
// app.use(expressSanitizer());
// IN THE CREATE ROUTE: req.body.blog.body = req.sanitize(req.body.blog.body) // this sanitizes what comes back from the body field on the form page
