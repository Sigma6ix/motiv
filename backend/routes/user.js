const express = require("express");
const router = express.Router();

// Import Controller
const { read, updateUserProfileOnboarding, handleSurveyResult, getLastSurveyResult, getAllSurveyResult } = require("../controllers/user");
const { requireSignin, adminMiddleware } = require("../controllers/auth");

// Import Validators

router.get("/user/all-survey-result", requireSignin, getAllSurveyResult);

router.get("/user/survey-result", requireSignin, getLastSurveyResult);
router.get("/user/view/:id", requireSignin, read);
router.get("/user/:id", requireSignin, read);
router.put("/user/update", requireSignin, updateUserProfileOnboarding);
router.put("/user/submit-survey", requireSignin, handleSurveyResult);

module.exports = router;
