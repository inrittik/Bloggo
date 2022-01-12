const User = require("../models/user");

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
    res.status(201).json(user);
  } catch (err) {
    res.status(400).send(err);
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
