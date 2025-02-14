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
  const { first_name, last_name, username, email, password } = user;
  await pool.query(
    `
      INSERT INTO users (first_name, last_name, username, email, password)
      VALUES ($1, $2, $3, $4, $5)
    `,
    [first_name, last_name, username, email, password]
  );
}

module.exports = { getAllUsers, getUserByUsername, getUserById, postNewUser };
