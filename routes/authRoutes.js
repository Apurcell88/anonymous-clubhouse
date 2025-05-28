const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/register", authController.registerUserGet);
router.post("/register", authController.registerUserPost);

router.get("/login", authController.loginUserGet);
router.post("/login", authController.loginUserPost);

router.post("/logout", authController.logoutUserPost);

// Auth check
router.get("/check-auth", authController.authCheckGet);

module.exports = router;
