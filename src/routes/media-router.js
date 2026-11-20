import express from 'express';
import {
  deleteMediaItem,
  getMediaItemById,
  getMediaItems,
  postMediaItem,
  putMediaItem,
} from '../controllers/media-controller.js';
import upload from '../middlewares/upload.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {body, query} from 'express-validator';
import {validationErrors} from '../middlewares/error-handlers.js';
//import {logRequest} from '../middlewares/logger.js';

const mediaRouter = express.Router();

// use middleware for all routes (mediaRouter)
//mediaRouter.use(logRequest);

mediaRouter
  .route('/')
  .get(
    query('limit')
      .custom((value) => {
        console.log(value);
        if (!value || !isNaN(Number(value))) {
          return true;
        } else {
          return false;
        }
      })
      .withMessage('Parameteter not a number'),
    validationErrors,
    getMediaItems,
  )
  .post(
    authenticateToken,
    upload.single('file'),
    body('title').isLength({min: 2}),
    validationErrors,
    postMediaItem,
  );

mediaRouter
  .route('/:id')
  .get(getMediaItemById)
  .put(putMediaItem)
  .delete(authenticateToken, deleteMediaItem);

export default mediaRouter;
