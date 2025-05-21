const { genPassword } = require("../lib/passwordUtils");
const { createUser } = require("../config/database");

const registerUserGet = (req, res) => {
  res.render("./register", { title: "Register" });
};

const registerUserPost = async (req, res) => {
  try {
    const { firstName, lastName, email, memberstatus, messages, pw } = req.body;
    const { hash, salt } = await genPassword(pw);

    const newUser = await createUser({
      firstName,
      lastName,
      email,
      hash,
      salt,
      membershipStatus: memberstatus,
      messages,
    });

    res.redirect("/login");
  } catch (err) {
    console.error("Error registering user: ", err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  registerUserGet,
  registerUserPost,
};
