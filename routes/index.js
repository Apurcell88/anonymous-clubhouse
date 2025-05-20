const express = require("express");
const { genPassword } = require("../lib/passwordUtils");
const pool = require("../config/pool");
const router = express.Router();
const messageController = require("../controllers/messageController");

// Example route
router.get("/", messageController.allMessagesGet);

router.post("/register", async (req, res) => {
  const { uname, pw } = req.body;
  const hash = await genPassword(pw);

  await pool.query("INSERT INTO users (username, hash) VALUES ($1, $2)", [
    uname,
    hash,
  ]);

  res.redirect("/login");
});

module.exports = router;
