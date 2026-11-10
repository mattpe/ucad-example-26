import {
  addMediaItem,
  deleteMediaItemById,
  fetchAllMediaItems,
  findMediaItemById,
  modifyMediaItem,
} from '../models/media-model-mockdata.js';

const getMediaItems = (req, res) => {
  const items = fetchAllMediaItems(req.query.limit);
  res.json(items);
};

const getMediaItemById = (req, res) => {
  const mediaItem = findMediaItemById(req.params.id);
  if (mediaItem) {
    res.json(mediaItem);
  } else {
    res.status(404).json({error: 404, message: 'Not found'});
  }
};

const postMediaItem = (req, res) => {
  // dummy validation example
  if (!req.body.title) {
    return res.status(400).json({error: 400, message: 'Something missing!'});
  }
  addMediaItem(req.body);
  res.status(201).json({message: 'New media item added.'});
};

const putMediaItem = (req, res) => {
  const updatedItem = modifyMediaItem(req.params.id, req.body);
  if (!updatedItem) {
    return res.status(404).json({error: 404, message: 'Item not found!'});
  }
  res.json({message: 'Media updated!', updatedItem});
};

const deleteMediaItem = (req, res) => {
  const success = deleteMediaItemById(req.params.id);
  if (!success) {
    return res.status(404).json({error: 404, message: 'Item not found!'});
  }
  res.json({message: 'Media deleted!'});
}

export {getMediaItems, getMediaItemById, postMediaItem, putMediaItem, deleteMediaItem};
