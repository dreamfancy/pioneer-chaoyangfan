const app = require('./src/app');
const pool = require('./src/pool');

pool
  .connect({
    host: 'postgres-pioneer-postgresql',
    port: 5432,
    database: 'pioneerDB_blog',
    user: 'postgres',
    password: 'cfan',
  })
  .then(() => {
    app().listen(4000, () => {
      console.log('blog service is Listening on port 4000');
    });
  })
  .catch((err) => console.error(err));
