const pool = require("./pool");

async function createUser({
  firstName,
  lastName,
  email,
  hash,
  salt,
  membershipStatus,
  messages,
}) {
  const result = await pool.query(
    "INSERT INTO users (first_name, last_name, email, hash, salt, membership_status, messages) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [firstName, lastName, email, hash, salt, membershipStatus, messages]
  );
  return result.rows[0];
}

module.exports = {
  createUser,
};
