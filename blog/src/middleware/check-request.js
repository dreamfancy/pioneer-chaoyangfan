module.exports = (req, res, next) => {
  console.log(req.headers);
  console.log(req.originalUrl);
  next();
};
