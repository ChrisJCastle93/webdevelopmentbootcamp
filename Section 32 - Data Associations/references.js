// LECTURE ABOUT REFERENCING DATA FOR USERS IN DATABASE, WHICH USE IDS TO LINK BETWEEN DATA
// STORES REFERENCES AS IDS RATHER THAN EMBEDDING DATA

var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var url = "mongodb://localhost/blogdemo_2";
mongoose.connect(url, function(err, db){
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

//SCHEMAS FROM LAST LECTURE

var postSchema = new mongoose.Schema({ //had to move this above userSchema, because postSchema needs defining before being used in the array of userSchema
    title: String,
    content: String,
});

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId, // RATHER THAN AN ARRAY OF POSTS, ITS AN ARRAY OF MONGOOSE OBJECT IDS THAT BELONG TO A POST IN THE NEXT LINE 
            ref: "Post"
        }
    ]
});

var User = mongoose.model("User", userSchema);
var Post = mongoose.model("Post", postSchema);

// // CREATING NEW USERS USING THIS METHOD - EXAMPLE

// User.create({
//     email:"bob@gmail.com",
//     name: "Bob Belcher"
// });

// // CREATING NEW POST USING THIS METHOD - EXAMPLE

// Post.create({
//     title:"How to cook the best burger",
//     content: "blah blah blah"
// }, function(err, post){
//     console.log(post);
// });

// SO HOW TO DO WE CONNECT THESE TWO?  = WORKING EXAMPLE (2x - one for steak, one for chicken to create 2 posts under Bob's data with 2x unique IDs)

// Post.create({                                                                       // THE POST THAT WE WANT TO ADD TO THE USER FILE
//     title:"How to cook the chicken",
//     content: "marinade. parchment paper. bake for 30."
// }, function(err, post){
//     User.findOne({email: "bob@gmail.com"}, function(err, foundUser){                // FINDING THE USER WE WANT TO ADD IT TO
//         if(err){
//             console.log;
//         } else {
//             foundUser.posts.push(post);                                             // PUSHING THE POST TO THE USER'S DATA
//             foundUser.save(function(err, data){                                     // SAVING THE USERS DATA
//                 if(err){
//                     console.log(err);                                               // CHECK ERROR
//                 } else {
//                     console.log(data);                                              // PRINT DATA
//                 }
//             })
//         }
//     })
// });

// FIND USER, AND FIND ALL POSTS FOR THAT USER IN ONE GO
User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){     // FIND THE USER, SHOW POSTS, EXECUTE QUERY 
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
});

// NEW LECTURE TO MAKE NEW FILES, CALL UPON THEM FOR THE SCHEMA ETC, KEEPS CODE CLEANER AND MAKES MORE MODULAR

// MAKE NEW DIRECTION CALLED MODELS, WITH NEW FILES CALLED POST AND USERS
// DEFINE MONGOOSE IN THERE AND REQUIRE
// ADD 'module.exports = mongoose.model("Post", postSchema);

//CREATED references2.js TO PROTECT THIS FILE.