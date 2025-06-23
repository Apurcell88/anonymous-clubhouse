const passport = require("passport");
const { genPassword } = require("../lib/passwordUtils");
const { createUser } = require("../config/database");

const registerUserGet = (req, res) => {
  res.render("./register", { title: "Register" });
};

const registerUserPost = async (req, res) => {
  try {
    const { firstName, lastName, email, memberstatus, pw, confirmPw } =
      req.body;

    if (pw !== confirmPw) {
      req.flash("error_msg", "Passwords do not match");
      return res.redirect("/auth/register");
    }
    const { hash } = await genPassword(pw);

    const newUser = await createUser({
      firstName,
      lastName,
      email,
      hash,
      membershipStatus: memberstatus,
    });

    req.flash("success_msg", "Account created! You can now log in.");
    return res.redirect("/auth/login");
  } catch (err) {
    if (err.code === "23505") {
      req.flash("error_msg", "That email is already registered.");
      return res.redirect("/auth/register");
    }

    console.error("Error registering user: ", err);
    res.status(500).send("Server Error");
  }
};

const loginUserGet = (req, res) => {
  res.render("./login", { title: "Login" });
};

const loginUserPost = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      req.flash("error_msg", "Invalid email or password");
      return res.redirect("/auth/login");
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      req.flash("success_msg", `Welcome back, ${user.first_name}`);
      return res.redirect("/");
    });
  })(req, res, next);
};

const logoutUserPost = (req, res) => {
  req.logout(() => {
    req.flash("success_msg", "You have been logged out.");
    res.redirect("/auth/login");
  });
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
  logoutUserPost,
  authCheckGet,
};
