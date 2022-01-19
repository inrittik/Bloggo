const jwt = require("jsonwebtoken");

// middleware for user authorization
const authorize = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SIGNATURE, (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

// middleware for checking login state of user
const authState = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SIGNATURE, (err, decodedToken) => {
      if (err) {
        res.redirect("/logout");
      } else {
        res.locals.state = true;
        next();
      }
    });
  } else {
    res.locals.state = false;
    next();
  }
};

module.exports = { authorize, authState };
