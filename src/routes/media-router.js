import express from 'express';
import {
  getMediaItemById,
  getMediaItems,
  postMediaItem,
  putMediaItem,
} from '../controllers/media-controller.js';

const mediaRouter = express.Router();

mediaRouter.route('/')
  .get(getMediaItems)
  .post(postMediaItem);

mediaRouter.route('/:id')
  .get(getMediaItemById)
  .put(putMediaItem);

export default mediaRouter;
