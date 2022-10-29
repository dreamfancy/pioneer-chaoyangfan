const pg = require('pg');

//NORMALLY, we will create a pool like this
// //But this approach does not work if we want to connect multiple DB at the same time
// const pool = new pg.Pool({
//     host: 'localhost',
//     port: 5432,
//     //..username, password .etc.
// });

class Pool {
  _pool = null;

  connect(options) {
    this._pool = new pg.Pool(options);
    return this._pool.query('SELECT 1 + 1;');
  }

  close() {
    this._pool.end();
  }

  query(sql, params) {
    return this._pool.query(sql, params);
  }
}

module.exports = new Pool();
