const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("./pool");
const { validPassword } = require("../lib/passwordUtils");

// Use email as the usernameField
const customFields = {
  usernameField: "email",
  passwordField: "password",
};

// Verify callback to check user credentials
const verifyCallback = async (email, password, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return done(null, false, { message: "No user found" });
    }

    const isValid = await validPassword(password, user.hash);
    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Password is incorrect" });
    }
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

// Store only user ID in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieve full user from DB using ID stored in session
passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = result.rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
