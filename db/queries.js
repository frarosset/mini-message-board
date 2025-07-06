const pool = require("./pool.js");

const getMessages = async () => {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
};

const getMessage = async (id) => {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id=$1", [id]);
  return rows.length > 0 ? rows[0] : null;
};

const addMessage = async (text, user) => {
  await pool.query('INSERT INTO messages (text, "user") VALUES ($1,$2)', [
    text,
    user,
  ]);
};

module.exports = { getMessages, addMessage, getMessage };
