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
    "INSERT INTO users (first_name, last_name, email, hash, membership_status) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, email, hash, membershipStatus]
  );
  return result.rows[0];
}

module.exports = {
  createUser,
};
