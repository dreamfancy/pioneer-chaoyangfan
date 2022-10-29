import express from 'express';
import { body } from 'express-validator';
import jwt, { Secret } from 'jsonwebtoken'; 

import { BadRequestError, validateRequest } from '@dreamfancy/common';

const router = express.Router();

router.post('/api/auth/signup', [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isAlphanumeric()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be alphanumeric and between 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if(!!existingUser) {
      //console.log('Email in use');
      throw new BadRequestError('Email has been used');   
    }

    const user = User.build({ email, password });
    await user.save();

    //Generate JWT and store it on the session object (used by cookieSession)
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY!);
    //req.session.jwt = userJwt; 
    req.session = {
      jwt: userJwt
    };
    res.status(201).send(user);
  }
);

export { router as signupRouter };