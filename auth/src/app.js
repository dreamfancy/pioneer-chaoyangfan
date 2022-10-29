const express = require('express');
//const authRouter = require('./routes/auth');
//const checkRequest = require('./middleware/check-request');
module.exports = () => {
  const app = express();
  app.use(express.json());
  // app.use(checkRequest);
  // app.use(authRouter);

  return app;
};
