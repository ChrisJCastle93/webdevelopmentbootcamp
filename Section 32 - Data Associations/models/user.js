var mongoose = require("mongoose");

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

module.exports = mongoose.model("User", userSchema);