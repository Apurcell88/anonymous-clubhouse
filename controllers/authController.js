const passport = require("passport");
const { genPassword } = require("../lib/passwordUtils");
const { createUser } = require("../config/database");

const registerUserGet = (req, res) => {
  res.render("./register", { title: "Register" });
};

const registerUserPost = async (req, res) => {
  try {
    const { firstName, lastName, email, memberstatus, pw } = req.body;
    const { hash } = await genPassword(pw);

    const newUser = await createUser({
      firstName,
      lastName,
      email,
      hash,
      membershipStatus: memberstatus,
    });

    res.redirect("/auth/login");
  } catch (err) {
    console.error("Error registering user: ", err);
    res.status(500).send("Server Error");
  }
};

const loginUserGet = (req, res) => {
  res.render("./login", { title: "Login" });
};

const loginUserPost = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  })(req, res, next); // <- invokes the authenticate function
};

const authCheckGet = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
};

module.exports = {
  registerUserGet,
  registerUserPost,
  loginUserGet,
  loginUserPost,
  authCheckGet,
};
