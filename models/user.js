const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

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

userSchema.pre("save", async function (next) {
  //   console.log("user to be created", this);
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      return user._id;
    }
    throw Error("Invalid credentials");
  }
  throw Error("Invalid credentials");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
