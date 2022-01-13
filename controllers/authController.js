const User = require("../models/user");
const jwt = require("jsonwebtoken");

//handle singup error
const handleError = (err) => {
  let errors = { email: "", password: "" };
  // console.log(err.message);
  if (err.code === 11000) {
    errors.email = "Email is already in use. Please use a different email";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// token validaity period
const validityPeriod = 3 * 24 * 60 * 60;

// create a jwt token
const createToken = (id) => {
  return jwt.sign({ id }, "bloggo-secret-signing-key", {
    expiresIn: validityPeriod,
  });
};

const signup_get = (req, res) => {
  res.render("signup", { title: "Signup" });
};
const login_get = (req, res) => {
  res.render("login", { title: "Login" });
};
const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    // create token after user is created
    const token = createToken(user._id);
    // place token inside a cookie
    res.cookie("jwt", token, { httpOnly: true, maxAge: validityPeriod * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    // res.status(400);
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
  // res.send("new user");
};
const login_post = (req, res) => {
  res.send(req.body);
  // res.send("logged in");
};

module.exports = {
  signup_get,
  login_get,
  signup_post,
  login_post,
};
