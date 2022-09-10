const express = require("express");
const router = express.Router();

// Import Controller
const {
  signup,
  accountActivation,
  signin,
  getUserToken,
} = require("../controllers/auth");

// Import Validators
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");
const { runValidation } = require("../validators");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/account-activation", accountActivation);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/get-user-token", getUserToken);

module.exports = router; // {}

// user: lucasjcoder
// pass: DStM0j19cJqyBa0A
