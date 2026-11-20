import express from 'express';
import {postUser} from '../controllers/user-controller.js';
import {body} from 'express-validator';
import {validationErrors} from '../middlewares/error-handlers.js';

const userRouter = express.Router();

userRouter
  .route('/')
  .post(
    body('username')
      .trim()
      .isLength({min: 3, max: 16})
      .withMessage('must be at least 3 chars long'),
    body('password').trim().isLength({min: 5}),
    body('email').isEmail().withMessage('Must be valid email address.').custom((content) => {
        // console.log('email value for custom validator', content)
        // palautusarvo true hyväksyy, false lisää validointivirheen
        return true;
    }).withMessage('custom validation failed'),
    validationErrors,
    postUser,
  );

export default userRouter;
