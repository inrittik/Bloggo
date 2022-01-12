const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "PLease enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "PLease enter a password"],
    minlength: [6, "Password ahould be at least 6 characters long"],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
