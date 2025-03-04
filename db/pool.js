require("dotenv").config();
const { Pool } = require("pg");

//DATABASE_URL

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
