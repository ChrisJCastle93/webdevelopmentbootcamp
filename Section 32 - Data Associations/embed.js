// LECTURE ABOUT EMBEDDING DATA FOR USERS IN DATABASE

var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var url = "mongodb://localhost/blogs";
var url = "mongodb://localhost/blogdemo";
mongoose.connect(url, function(err, db){
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

//USER - EMAIL, NAME

var postSchema = new mongoose.Schema({ //had to move this above userSchema, because postSchema needs defining before being used in the array of userSchema
    title: String,
    content: String,
});

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema] //adding postSchema into array, which tells Mongoose that this will be a list of posts, that are held in the postSchema.
});

var User = mongoose.model("User", userSchema);


//POST - TITLE, CONTENT

var Post = mongoose.model("Post", postSchema);

// NEW USER - different schema, just testing out

    // var newUser = new User({
    //     email: "charlie@brown.edu",
    //     name: "Charlie Brown"
    // });

    // newUser.save(function(err, user){
    // if(err){
    //     console.log(err);
    // } else {
    //     console.log(user);
    // }
    // })

// NEW POST - different schema, just testing out

// var newPost = new Post({
//     title: "Apple",
//     content: "They are delicious"
// });

// newPost.save(function(err, post){
// if(err){
//     console.log(err);
// } else {
//     console.log(post);
// }
// })

// // ADDING NEW USER WITH POSTS EXAMPLE

    // var newUser = new User({
    //     email: "harry@hogwarts.edu",
    //     name: "Hermione Granger"
    // });

    // newUser.posts.push({
    //     title: "How to brew polyjuice potion",
    //     content: "Just kidding."
    // })

    // newUser.save(function(err, user){
    // if(err){
    //     console.log(err);
    // } else {
    //     console.log(user);
    // }
    // })

// FINDING POSTS AND USERS

User.findOne({name: "Hermione Granger"}, function(err, user){ //use findOne to retrieve
    if(err) {
        // console.log(err);
    } else {
        user.posts.push({ //adding new posts to Hermione's file
            title: "3 Things I really hate",
            content: "Voldemort. Snape. Ron."
        })
        user.save(function(err, user){ // Need to do this again to save the new data in the database
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
})