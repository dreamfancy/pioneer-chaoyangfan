const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class BlogRepo {
  static async find() {
    const { rows } = await pool.query('SELECT * FROM blogs;');
    return toCamelCase(rows);
  }
  å;

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM blogs WHERE id = $1 LIMIT 1;`,
      [id]
    );
    return toCamelCase(rows)[0]; //if no users, it is undefined
  }

  static async insert(username, title, description, contents) {
    const { rows } = await pool.query(
      `INSERT INTO blogs(username, title, description, contents) VALUES ($1, $2, $3, $4) RETURNING * ;`,
      [username, title, description, contents]
    );
    return toCamelCase(rows)[0];
  }

  static async update(id, username, title, description, contents) {
    const { rows } = await pool.query(
      `UPDATE blogs SET username = $2, title = $3, description = $4, WHERE id = $1 RETURNING * ;`,
      [id, username, title, description, contents]
    );
    return toCamelCase(rows)[0];
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM blogs WHERE id = $1 RETURNING *;`,
      [id]
    );
    return toCamelCase(rows)[0];
  }

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM blogs;');
    return parseInt(rows[0].count);
  }
}

module.exports = BlogRepo;
