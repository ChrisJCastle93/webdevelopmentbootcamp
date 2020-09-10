var mongoose    = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    author: {           // AUTHOR CHANGED FROM STRING TO OBJECT
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);