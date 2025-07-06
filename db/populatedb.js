#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const SQL = `
    CREATE TABLE IF NOT EXISTS messages(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        text VARCHAR(${Number(process.env.TEXT_MAX_LENGTH)}),
        "user" VARCHAR(${Number(process.env.USER_MAX_LENGTH)}) DEFAULT '${
  process.env.USER_DEFAULT_NAME
}',
        added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO messages (text, "user") VALUES
        ('Hello world!', 'frarosset'),
        ('Welcome to my Mini Message Board!', 'frarosset');
`;

const connectionString =
  process.argv.length > 2 ? process.argv[2] : process.env.DB_CONNECTION_STRING;

async function main() {
  const client = new Client({ connectionString });

  await client.connect();
  await client.query(SQL);
  await client.end();
}

main();
