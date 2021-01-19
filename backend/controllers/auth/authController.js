const Users = require("../../models/userModel");
const createToken = require("../../utils/createJWT");
const bcrypt = require("bcryptjs");

exports.authUser = (req, res, next) => {
  const { email, password } = req.body;
  Users.findOne({ email })
    .then((user) => {
      if (!user) {
        throw new Error("username or password are invalid");
      } else {
        bcrypt.compare(String(password), user.password).then((pass) => {
          if (pass) {
            res.send({
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              token: createToken(user._id),
            });
          } else {
            const err = new Error("username or password are invalid");
            err.setStatus = 401;
            next(err);
          }
        });
      }
    })
    .catch((err) => {
      err.setStatus = 401;
      next(err);
    });
};

exports.getProfile = (req, res, next) => {
  const sending = { ...req.user, token: createToken(req.user._id) };
  res.json(sending);
};

exports.updateProfile = (req, res, next) => {
  const updatedValues = req.body;
  const userId = updatedValues._id || req.user._id;

  if (updatedValues.password) {
    updatedValues.password = bcrypt.hashSync(updatedValues.password, 10);
  }

  Users.updateOne({ _id: userId }, updatedValues)
    .then(() => {
      Users.findOne({ _id: userId })
        .select("-password")
        .then((newUser) => {
          res.json({ ...newUser._doc, token: createToken(newUser._doc._id) });
        });
    })
    .catch((err) => {
      res.json({ message: err.message });
    });
};

exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  const user = { name, email, password: bcrypt.hashSync(password, 10) };

  Users.create(user)
    .then((newUser) => {
      const jsonRes = {
        _id: newUser._id,
        isAdmin: newUser.isAdmin,
        email: newUser.email,
        name: newUser.name,
        token: createToken(newUser._id),
      };
      req.user = jsonRes;
      res.status(201).send(jsonRes);
    })
    .catch((err) => {
      if (err.keyPattern.email) {
        err.message = "user already exists";
        err.setStatus = 401;
        res.json({ message: err.message });
      }
      next(err);
    });
};

exports.getUsers = (req, res, next) => {
  Users.find({})
    .select("-password")
    .then((reults) => {
      res.status(201).send(reults);
    })
    .catch((err) => {
      err.message = "server error";
      err.setStatus = 401;
      res.status(401).json({ message: err.message });
    });
};

exports.getUserbyId = (req, res, next) => {
  const id = req.params.id;
  Users.findOne({ _id: id })
    .select("-password")
    .then((paymentResults) => {
      if (paymentResults) {
        res.status(201).send(paymentResults);
      } else {
        res.status(404).send({ message: "user does not exist" });
      }
    })
    .catch((err) => {
      err.message = "server error";
      err.setStatus = 401;
      res.status(401).json({ message: err.message });
    });
};

exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  Users.deleteOne({ _id: id })
    .then(() => {
      res.status(200).json({ message: "deleted" });
    })
    .catch((err) => {
      res.status(404).json({ message: err.message ? "user do not exist" : "server error" });
    });
};

exports.updateUser = (req, res, next) => {
  const updatedValues = req.body;

  const userId = req.params.id;
  if (updatedValues.password) {
    updatedValues.password = bcrypt.hashSync(updatedValues.password, 10);
  }

  Users.updateOne({ _id: userId }, updatedValues)
    .then(() => {
      Users.findOne({ _id: userId })
        .select("-password")
        .then((newUser) => {
          res.json(newUser);
        });
    })
    .catch((err) => {
      res.json({ message: err.message });
    });
};
