var mongoose = require("mongoose");
var passportLocalMongoose   = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose); //TAKES THE PACKAGE AND REQUIRED HERE, ADDS METHODS TO THE USER SCHEMA

module.exports = mongoose.model("User", UserSchema)