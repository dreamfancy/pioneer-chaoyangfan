const express = require('express');
const blogsRouter = require('./routes/blogs');

module.exports = () => {
  const app = express();

  app.use(express.json());
  app.use(blogsRouter);

  return app;
};
