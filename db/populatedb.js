#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS session;

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(80) NOT NULL,
    last_name VARCHAR(80) NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(80) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_member BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    message TEXT NOT NULL,
    added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users(id)
);

`;

async function main() {
  console.log("seeding");

  const database = process.argv[2];

  if (database === "local") {
    const client = new Client({
      connectionString: process.env.LOCAL_DB,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
  }

  if (database === "production") {
    const client = new Client({
      connectionString: process.env.DATABASE_PUBLIC_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
  }

  console.log("done");
}

main();
