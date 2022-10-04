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

  static async insert(username, title, contents) {
    const { rows } = await pool.query(
      `INSERT INTO blogs(username, title, contents) VALUES ($1, $2, $3) RETURNING * ;`,
      [username, title, contents]
    );
    return toCamelCase(rows)[0];
  }

  static async update(id, username, title, contents) {
    const { rows } = await pool.query(
      `UPDATE blogs SET username = $1, title = $2 WHERE id = $3 RETURNING * ;`,
      [username, title, contents]
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
