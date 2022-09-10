const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { error, success, notFound } = require("../utils/response");

/* ===================> READ User Profile from ADMIN <=================*/
exports.read = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

/* ===================> Update User Profile from USER ONBOARDING <=================*/
exports.updateUserProfileOnboarding = (req, res) => {
  const {
    firstName,
    lastName,
    photoURL,
  } = req.body;

  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.photoURL = photoURL;

    user.save((err, updatedUser) => {
      if (err) {
        console.log("User update err", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }

      const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      console.log("Onboarding Success");

      res.json({ accessToken, updatedUser });
    });
  });
};
