const db = require('../config/db');

const User = {
  create: async ({ name, email, username, password }) => {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)',
      [name, email, username, password]
    );
    return result;
  },

  findByEmailOrUsername: async (identifier) => {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ? OR username = ? LIMIT 1',
      [identifier, identifier]
    );
    return rows[0];
  },

  findById: async (id) => {
    const [rows] = await db.execute('SELECT id, name, email, username, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = User;
