const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
});

userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

module.exports = User;