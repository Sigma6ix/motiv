const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { notFound } = require("../utils/response");


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

exports.handleSurveyResult = async (req, res) => {
  const { _id } = req.user;

  const surveyResult = req.body;

  const user = await User.findOne({ _id });

  if (!user) {
    return notFound(res, "User not found");
  }
  
  let company_culture = 0;
  let title_and_status = 0;
  let compensation = 0;
  let learning = 0;
  let diversity = 0;
  let leadership = 0;

  // calculate the scores Leader, Innovator, Collaborator, and Challenger etc.
  surveyResult.forEach(questionObject => {
    switch(questionObject.answer) {
      case "CC":
        company_culture += 1;
        break;
      case "TS":
        title_and_status += 1;
        break;
      case "C":
        compensation += 1;
        break;
      case "L":
        learning += 1;
        break;
      case "D":
        diversity += 1;
        break;
      case "LH":
        leadership += 1;
        break;
      default:
        break;
    }
  });

  let company_culture_percentage = (company_culture / surveyResult.length) * 100;
  let title_and_status_percentage = (title_and_status / surveyResult.length) * 100;
  let compensation_percentage = (compensation / surveyResult.length) * 100;
  let learning_percentage = (learning / surveyResult.length) * 100;
  let diversity_percentage = (diversity / surveyResult.length) * 100;
  let leadership_percentage = (leadership / surveyResult.length) * 100;

  user.company_culture = company_culture_percentage;
  user.title_and_status = title_and_status_percentage;
  user.compensation = compensation_percentage;
  user.learning = learning_percentage;
  user.diversity = diversity_percentage;
  user.leadership = leadership_percentage;

  user.save();

  return res.status(200).json({
    company_culture_percentage,
    title_and_status_percentage,
    compensation_percentage,
    learning_percentage,
    diversity_percentage,
    leadership_percentage,
  });
};

exports.getLastSurveyResult = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findOne({ _id });

  if (!user) {
    return notFound(res, "User not found");
  }

  return res.status(200).json({
    company_culture: user.company_culture,
    title_and_status: user.title_and_status,
    compensation: user.compensation,
    learning: user.learning,
    diversity: user.diversity,
    leadership: user.leadership,
  });
}
