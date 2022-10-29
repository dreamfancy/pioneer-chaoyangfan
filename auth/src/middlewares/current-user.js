import jwt from 'jsonwebtoken';

export const currentUser = (req, res, next) => {
  if (!req.session || !req.session.jwt) {
    //req.user = { currentUser: null };
    return next(); //We just do not set user in the req
  }
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY);
    //req.user = { currentUser: payload };
    req.currentUser = payload;
  } catch (err) {
    //req.user({ currentUser: null });
  }
  next();
};
