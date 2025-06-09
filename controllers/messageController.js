const { getMessages, createMessage } = require("../config/database");

const allMessagesGet = async (req, res) => {
  try {
    const messages = await getMessages();

    res.render("./home", {
      title: "Anonymous Clubhouse",
      user: req.user,
      messages,
    });
  } catch (err) {
    console.error("Error fetching messages: ", err);
  }
};

const createMessagePost = async (req, res) => {
  try {
    if (!req.user) {
      req.flash("error_msg", "You must be logged in to post a message.");
      return res.redirect("/");
    }

    const { title, body } = req.body;
    const userId = req.user.id;

    await createMessage({ title, body, userId });

    req.flash("success_msg", "Message posted!");
    res.redirect("/");
  } catch (err) {
    console.error("Error posting message: ", err);
    req.flash("error_msg", "Failed to post message");
    res.redirect("/");
  }
};

module.exports = {
  allMessagesGet,
  createMessagePost,
};
