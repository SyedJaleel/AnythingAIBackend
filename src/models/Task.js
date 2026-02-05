const db = require('../config/database');

const Task = {
  create: (title, description, createdBy) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO tasks (title, description, createdBy) VALUES (?, ?, ?)`,
        [title, description, createdBy],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM tasks WHERE id = ?`, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  getAllByUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM tasks WHERE createdBy = ? ORDER BY createdAt DESC`,
        [userId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows || []);
        }
      );
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT tasks.*, users.email FROM tasks 
         LEFT JOIN users ON tasks.createdBy = users.id 
         ORDER BY tasks.createdAt DESC`,
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows || []);
        }
      );
    });
  },

  update: (id, title, description, status) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE tasks SET title = ?, description = ?, status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
        [title, description, status, id],
        function(err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM tasks WHERE id = ?`, [id], function(err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }
};

module.exports = Task;
