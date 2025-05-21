const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

const authRoutes = require("./authRoutes");
const messageRoutes = require("./messageRoutes");

router.get("/", messageController.allMessagesGet);

router.use("/auth", authRoutes);
router.use("/messages", messageRoutes);

module.exports = router;
