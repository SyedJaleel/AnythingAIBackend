const db = require('../config/database');

const User = {
  create: (email, hashedPassword, role = 'user') => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`,
        [email, hashedPassword, role],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  },

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT id, email, role, createdAt FROM users`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  },

  updateRole: (id, role) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE users SET role = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
        [role, id],
        function(err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM users WHERE id = ?`, [id], function(err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }
};

module.exports = User;
