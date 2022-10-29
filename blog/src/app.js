const express = require('express');
const blogsRouter = require('./routes/blogs');
const checkRequest = require('./middleware/check-request');
module.exports = () => {
  const app = express();

  app.use(express.json());
  app.use(checkRequest);
  app.use(blogsRouter);

  return app;
};
