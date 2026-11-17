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
//import {logRequest} from '../middlewares/logger.js';

const mediaRouter = express.Router();

// use middleware for all routes (mediaRouter)
//mediaRouter.use(logRequest);

mediaRouter.route('/')
  .get(getMediaItems)
  .post(authenticateToken, upload.single('file'), postMediaItem);

mediaRouter.route('/:id')
  .get(getMediaItemById)
  .put(putMediaItem)
  .delete(authenticateToken, deleteMediaItem);

export default mediaRouter;
