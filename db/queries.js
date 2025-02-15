const pool = require("./pool");

async function getAllUsers() {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
}

async function getUserByUsername(username) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username ILIKE $1",
    [username]
  );
  return rows;
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows;
}

async function postNewUser(user) {
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    is_admin,
    is_member,
  } = user;
  await pool.query(
    `
      INSERT INTO users (first_name, last_name, username, email, password, is_admin, is_member)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
    [first_name, last_name, username, email, password, is_admin, is_member]
  );
}

async function verifyMember(id) {
  await pool.query("UPDATE users SET is_member = true WHERE id = $1", [id]);
}

async function addNewPost(id, message) {
  await pool.query(`INSERT INTO messages (user_id, message) VALUES ($1, $2)`, [
    id,
    message,
  ]);
}

async function getAllMessages() {
  const { rows } = await pool.query(`
    SELECT users.username AS username, messages.message AS message, messages.added AS added, messages.id AS id
    FROM messages
    JOIN users ON users.id = messages.user_id
    ORDER BY messages.added DESC
  `);
  return rows;
}

async function deletePost(id) {
  await pool.query("DELETE FROM messages WHERE id = $1", [id]);
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  getUserById,
  postNewUser,
  verifyMember,
  addNewPost,
  getAllMessages,
  deletePost,
};
