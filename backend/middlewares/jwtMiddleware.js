const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const jwtMiddleware = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    User.findOne({ _id: decoded._id || decoded.id })
      .select("-password")
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          const err = new Error("unauthorized, no token");
          err.setStatus = 401;
          next(err);
        }
      });
  }

  if (!token) {
    const err = new Error("unauthorized, no token");
    err.setStatus = 401;
    next(err);
  }
};

exports.protect = jwtMiddleware;

const adminMiddleware = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    User.findOne({ _id: decoded._id || decoded.id })
      .select("-password")
      .then((user) => {
        if (user) {
          if (user.isAdmin) {
            req.user = user;
            next();
          } else {
            const err = new Error("not admin");
            err.setStatus = 401;
            next(err);
          }
        } else {
          const err = new Error("unauthorized, no token");
          err.setStatus = 401;
          next(err);
        }
      });
  }
  if (!token) {
    const err = new Error("unauthorized, no token");
    err.setStatus = 401;
    next(err);
  }
};

exports.admin = adminMiddleware;
