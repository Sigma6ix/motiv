const express = require("express");
const router = express.Router();

// Import Controller
const { read, updateUserProfileOnboarding } = require("../controllers/user");
const { requireSignin, adminMiddleware } = require("../controllers/auth");

// Import Validators

router.get("/user/view/:id", requireSignin, read);
router.get("/user/:id", requireSignin, read);
router.put("/user/update", requireSignin, updateUserProfileOnboarding);

module.exports = router;
