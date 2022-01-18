const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "bloggo-secret-signing-key", (err, decodedToken) => {
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

module.exports = { authorize };
