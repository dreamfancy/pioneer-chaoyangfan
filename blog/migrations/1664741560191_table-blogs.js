/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  CREATE TABLE blogs (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      title VARCHAR,
      description VARCHAR,
      contents TEXT,
      username VARCHAR
  );
`);
};

exports.down = (pgm) => {
  pgm.sql(`
  DROP TABLE blogs;
`);
};
