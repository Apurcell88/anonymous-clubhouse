const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/register", authController.registerUserGet);
router.post("/register", authController.registerUserPost);

module.exports = router;
