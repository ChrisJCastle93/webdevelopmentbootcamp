var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");              // NEW FILE TO BE ADDED IN NEXT LECTURE

var data = [                                                // DATA TO START US OFF
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

///////////////// SEEDING FUNCTION /////////////////////

function seedDB() {
Campground.deleteMany({}, function(err){                                            // REMOVES ALL CAMPGROUNDS
//    if(err) {
//        console.log(err);
//    }
//    console.log("Removed campgrounds.");

//                                                                                 // NOW ADD A FEW CAMPGROUNDS TO START
//    data.forEach(function(seed){
//            Campground.create(seed, function(err, campground){                   // CREATES CAMPGROUND
//                if(err){                                                         // ERROR CHECK
//                    console.log(err);
//                } else {
//                    console.log("Added a campground..");                         // PRINT CAMPGROUND ADDED
//                    Comment.create(                                              // ADD COMMENTS TO THAT CAMPGROUND
//                        {
//                            text: "This place is great, but I wish I had internet", // WHAT WE'RE ADDING AS COMMENT
//                            author: "Homer"
//                        }, function(err, comment){
//                            if(err) {                                            // ERROR CHECK
//                                console.log(err);
//                            } else {
//                                campground.comments.push(comment);               // ADD COMMENT INTO campground.comments array
//                                campground.save();                               // SAVE DATA
//                                console.log("Created new comment.");             // PRINT CONFIRMATION
//                            }
//                        });
//                }
//            });
//        });
});
   //Add a few comments
}

//////////////// MODULE EXPORTS /////////////////////////

module.exports = seedDB;