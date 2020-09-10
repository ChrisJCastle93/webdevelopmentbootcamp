mongoose    = require("mongoose");

// SCHEMA SETUP

//Define - tells us what a campground should look like

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [                                         //new addition to file to have comments as part of campgroundSchema
        {
           type: mongoose.Schema.Types.ObjectId,        // associates the campground, as defined by the schema here, with X comments via the object ID
           ref: "Comment"                               // just a reference to the comments // name of the model
        }
     ]
});

//Exporting - takes the schema blueprint for what it should look like, and gives us a model where we can use things like find and create

module.exports = mongoose.model("Campground", campgroundSchema); // CHANGED TO module.exports. creates model with above schema and has methods such as .find etc.
