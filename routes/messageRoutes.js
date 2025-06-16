const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.get("/", messageController.allMessagesGet);

router.post("/new", messageController.createMessagePost);

router.delete("/:id", messageController.deleteMessage);

router.post("/edit/:id", messageController.editMessageByIdPost);

module.exports = router;
