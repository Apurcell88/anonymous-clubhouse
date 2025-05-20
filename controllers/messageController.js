const allMessagesGet = (req, res) => {
  res.render("./home", { title: "Anonymous Clubhouse" });
};

module.exports = {
  allMessagesGet,
};
