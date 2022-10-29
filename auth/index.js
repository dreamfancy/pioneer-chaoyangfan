const app = require('./src/app');
const pool = require('./src/pool');

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is needed from env variable');
  }

  pool
    .connect({
      host: 'postgres-pioneer-postgresql',
      port: 5432,
      database: 'pioneerDB_auth',
      user: 'postgres',
      password: 'cfan',
    })
    .then(() => {
      app().listen(4001, () => {
        console.log('auth service is Listening on port 4001');
      });
    })
    .catch((err) => console.error(err));
};

start();
