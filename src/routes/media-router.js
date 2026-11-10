import express from 'express';
import {
  getMediaItemById,
  getMediaItems,
  postMediaItem,
  putMediaItem,
} from '../controllers/media-controller.js';
import {logRequest} from '../middlewares/logger.js';

const mediaRouter = express.Router();

// use middleware for all routes (mediaRouter)
//mediaRouter.use(logRequest);

mediaRouter.route('/')
  .get(getMediaItems)
  .post(postMediaItem);

mediaRouter.route('/:id')
  .get(getMediaItemById)
  .put(putMediaItem);

export default mediaRouter;
