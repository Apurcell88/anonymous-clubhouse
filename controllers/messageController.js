const {
  getMessages,
  createMessage,
  deleteMessageById,
  editMessage,
} = require("../config/database");

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

const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const userId = req.user?.id; // ? makes it optional

    const messages = await getMessages(messageId);
    const message = messages.find((msg) => msg.id === parseInt(messageId));

    if (!message) {
      req.flash("error_msg", "Message not found");
      return res.redirect("/");
    }

    if (message.user.id !== userId) {
      req.flash("error_msg", "You can only delete your own messages.");
      return res.redirect("/");
    }

    await deleteMessageById(messageId);
    req.flash("success_msg", "Message deleted.");
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting message: ", err);
    req.flash("error_msg", "Failed to delete message.");
    res.redirect("/");
  }
};

const editMessageByIdPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const { id } = req.params;

    await editMessage(id, title, body);

    req.flash("success_msg", "Message updated successfully");
    res.redirect("/");
  } catch (err) {
    console.error("Error updating message: ", err);
    req.flash("error_msg", "Failed to update message");
    res.redirect("/");
  }
};

const editMessageByIdGet = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(`SELECT * FROM message WHERE id = $1`, [id]);

  if (result.rows.length === 0) {
    req.flash("error_msg", "Message not found");
    return res.redirect("/");
  }

  res.render();
};

module.exports = {
  allMessagesGet,
  createMessagePost,
  deleteMessage,
  editMessageByIdPost,
  editMessageByIdGet,
};
