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

async function getMessages() {
  const result = await pool.query(`
    SELECT messages.id, messages.title, messages.body, messages.created_at, users.first_name, users.last_name
    FROM messages
    JOIN users ON messages.user_id = users.id
    ORDER BY messages.created_at DESC
    `);

  return result.rows.map((msg) => ({
    id: msg.id,
    title: msg.title,
    body: msg.body,
    created_at: msg.created_at,
    user: {
      first_name: msg.firstName,
      last_name: msg.last_name,
    },
  }));
}

async function createMessage({ title, body, userId }) {
  const result = await pool.query(
    `INSERT INTO messages (title, body, user_id, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *`,
    [title, body, userId]
  );
  return result.rows[0];
}

module.exports = {
  createUser,
  getMessages,
  createMessage,
};
