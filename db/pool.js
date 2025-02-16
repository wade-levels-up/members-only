require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.LOCAL_DB,
});

module.exports = pool;
