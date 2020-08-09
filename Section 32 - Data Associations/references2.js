// NEW LECTURE TO MAKE NEW FILES, CALL UPON THEM FOR THE SCHEMA ETC, KEEPS CODE CLEANER AND MAKES MORE MODULAR
// MAKE NEW DIRECTORY CALLED MODELS, WITH NEW FILES CALLED POST AND USERS
// DEFINE MONGOOSE IN THERE AND REQUIRE
// ADD 'module.exports = mongoose.model("Post", postSchema)' to those files to tell the require what to export.

//CREATED references2.js TO PROTECT THIS FILE.

var mongoose = require("mongoose");
var Post = require("./models/post"); // CALLING ON THE SEPARATE FILE
var User = require("./models/user"); // CALLING ON THE SEPARATE FILE

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var url = "mongodb://localhost/blogdemo_2";
mongoose.connect(url, function(err, db){
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// SCHEMAS ARE IN A SEPARATE FILE, VAR POSTS AND USERS ARE NOW REQUIRED AT THE TOP OF FILE INSTEAD TO CALL UPON THEM

// RUNNING AN EXAMPLE TO CHECK ALL OF IT IS WORKING - SAME EXAMPLE AS BEFORE BEING RERUN, CHANGED TO BURGERS :)

Post.create({                                                                       // THE POST THAT WE WANT TO ADD TO THE USER FILE
    title:"How to cook the best burger",
    content: "Go to mcdonalds"
}, function(err, post){
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser){                // FINDING THE USER WE WANT TO ADD IT TO
        if(err){
            console.log;
        } else {
            foundUser.posts.push(post);                                             // PUSHING THE POST TO THE USER'S DATA
            foundUser.save(function(err, data){                                     // SAVING THE USERS DATA
                if(err){
                    console.log(err);                                               // CHECK ERROR
                } else {
                    console.log(data);                                              // PRINT DATA
                }
            })
        }
    })
});