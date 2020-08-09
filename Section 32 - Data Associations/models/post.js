var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({ //had to move this above userSchema, because postSchema needs defining before being used in the array of userSchema
    title: String,
    content: String,
});

module.exports = mongoose.model("Post", postSchema);