var express = require("express"); // MUST REQUIRE AGAIN IN THIS FILE
var router  = express.Router({mergeParams: true});  // merge params line fixes the 'null' issues
var Campground = require("../models/campground");   // Campground AND Comment not defined in this doc, so need to link them
var Comment = require("../models/comment");
var User = require("../models/user");             
var Notification = require("../models/notification");
var NodeGeocoder = require('node-geocoder');
var Review = require("../models/review");
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
var geocoder = NodeGeocoder(options);
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dghirdm1f', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});
let { checkCampgroundOwnership, isLoggedIn, isPaid } = require("../middleware");
router.use(isLoggedIn, isPaid);

// ======================
// REST ROUTES
// ======================

//REST = INDEX ROUTE

router.get("/", function (req, res) {
    var perPage = 8;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    var noMatch = null;
    if (req.query.paid) res.locals.success = 'Payment succeeded, welcome to YelpCamp!';
    if(req.query.search) {
        var regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({$or: [{name: regex,}, {location: regex}, {"author.username":regex}]}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
            Campground.count().exec(function (err, count) {
           if(err){
               console.log(err);
           } else {
              if(allCampgrounds.length < 1) {
                req.flash('error', 'Sorry, no campgrounds match your query. Please try again');
                return res.redirect('/campgrounds');
              }
              res.render("campgrounds/index",{campgrounds:allCampgrounds, noMatch: noMatch, current: pageNumber, pages: Math.ceil(count / perPage)});
           }
        });
        });
    } else {
    Campground.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
        Campground.count().exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render("campgrounds/index", {
                    campgrounds: allCampgrounds,
                    noMatch: noMatch,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        });
    });
}});

////////////////////

//REST - CREATE - ADD NEW CAMPGROUND TO DB

router.post("/", upload.single('image'), async function(req, res) {
    cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
      if(err) {
        req.flash('error', err.message);
        return res.redirect('back');
      }
          geocoder.geocode(req.body.location, async function (err, data) {
      if (err || !data.length) {
          console.log(err);
        req.flash('error', 'Invalid address');
        return res.redirect('back');
      }
      var searchterm = req.body.searchterm;
      var image = result.secure_url;  
      var imageId = result.public_id;                       //ADDED                                               // CHANGED FROM req.body.imglink
      var cost = req.body.cost;
      var price = req.body.price;
      var campdescription = req.body.campdescription;
      var author = {
          id: req.user._id,
          username: req.user.username
      };
      var lat = data[0].latitude;
      var lng = data[0].longitude;
      var location = data[0].formattedAddress;
      var newCampground = {name: searchterm, imageId: imageId, image: image, cost: cost, description: campdescription, author: author, price: price, location: location, lat: lat, lng: lng};
    try {
        let campground = await Campground.create(newCampground);
        let user = await User.findById(req.user._id).populate('followers').exec();
        let newNotification = {
          username: req.user.username,
          campgroundId: campground.id
        }
        for(const follower of user.followers) {
          let notification = await Notification.create(newNotification);
          follower.notifications.push(notification);
          follower.save();
        }  
        // res.redirect(`/campgrounds/${campground.id}`);
        res.redirect("/campgrounds/" + campground.slug);
    } catch(err) {
        req.flash('error', err.message);
        debugger
        console.log(err);
        res.redirect('back');
      }
    });
    })                                                                                         
    });

//REST - NEW - SHOW FORM TO ADD NEW CAMPGROUND

router.get("/new", function(req, res){          //REMOVED /campgrounds as it's now in the path in the app.js file
    res.render("campgrounds/new.ejs");
});

////////////////////

//REST - SHOW - OPEN UP PRODUCT DETAILS

router.get("/:slug", function (req, res) {
    Campground.findOne({slug: req.params.slug}).populate("comments likes").populate({
        path: "reviews",
        options: {sort: {createdAt: -1}}
    }).exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

////////////////////

///////// REST EDIT CAMPGROUND FORM

router.get("/:slug/edit", checkCampgroundOwnership, function(req,res){            // ADDED IN MIDDLEWARE
    Campground.findOne({slug: req.params.slug}, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
  });
});

///////// REST UPDATE CAMPGROUND

router.put("/:slug", checkCampgroundOwnership, upload.single('image'), function(req, res){    
    geocoder.geocode(req.body.campground.location, function (err, data) {
      Campground.findOne({slug: req.params.slug}, async function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            if(req.file){
                try {
                    await cloudinary.v2.uploader.destroy(campground.imageId);
                    var result = await cloudinary.v2.uploader.upload(req.file.path);
                    campground.imageId = result.public_id;
                    campground.image = result.secure_url;    
                } catch(err) {
                    req.flash("error", err.message);
                    return res.redirect("back");
                }
            }
            if(req.body.location !== campground.location){
                try{
                    var updatedLocation = await geocoder.geocode(req.body.location);
                    campground.lat = updatedLocation[0].latitude;
                    campground.lng = updatedLocation[0].longitude;
                    campground.location = updatedLocation[0].formattedAddress;
                } catch(err){
                    req.flash("error", err.message);
                    return res.redirect("back");
                }
            }
            campground.name = req.body.campground.name;
            campground.price = req.body.campground.price;
            campground.description = req.body.campground.description;  
            campground.save(function (err) {
                req.flash("success","Successfully Updated!");
                res.redirect("/campgrounds/" + campground.slug);
            }); //CLOSES CAMPGROUND.SAVE   
        }       //CLOSES ELSE
        });     //CLOSES CAMPGROUND.FINDONE
    });         //CLOSES GEOCODER
});             //CLOSES ROUTER

// DESTROY CAMPGROUND ROUTE

router.delete("/:slug", checkCampgroundOwnership, function (req, res) {
    Campground.findOne({slug: req.params.slug}, async function (err, campground) {
        if(err){
            req.flash("error", err.message);
            return res.redirect("back");
        };
        try{
            await cloudinary.v2.uploader.destroy(campground.imageId);
            campground.remove();
            req.flash("success","Successfully deleted!");
            Comment.deleteMany( {_id: { $in: campground.comments } }, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            Review.deleteMany( {_id: { $in: campground.reviews } }, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            res.redirect("/campgrounds")
        } catch(err){
            if(err){
                req.flash("error", err.message);
                return res.redirect("back");
            };
        };
    });
});

// Campground Like Route

router.post("/:slug/like", isLoggedIn, function (req, res) {
    Campground.findOne({slug: req.params.slug}, function (err, foundCampground) {
        if (err) {
            console.log(err);
            return res.redirect("/campgrounds");
        }
        // check if req.user._id exists in foundCampground.likes
        var foundUserLike = foundCampground.likes.some(function (like) {
            return like.equals(req.user._id);
        });

        if (foundUserLike) {
            // user already liked, removing like
            foundCampground.likes.pull(req.user._id);
        } else {
            // adding the new user like
            foundCampground.likes.push(req.user);
        }

        foundCampground.save(function (err) {
            if (err) {
                console.log(err);
                return res.redirect("/campgrounds");
            }
            return res.redirect("/campgrounds/" + foundCampground.slug);
        });
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//////// TEST AREA //////////

//////////////////


module.exports = router;



