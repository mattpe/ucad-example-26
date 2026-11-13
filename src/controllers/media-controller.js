import {
  addMediaItem,
  deleteMediaItemById,
  fetchAllMediaItems,
  findMediaItemById,
  modifyMediaItem,
} from '../models/media-model.js';

const getMediaItems = async (req, res) => {
  const limit = Number(req.query.limit);
  if (req.query.limit && isNaN(limit)) {
    return res.status(400).json({error: 400, message: 'Parameteter not a number'});
  }
  const items = await fetchAllMediaItems(limit);
  res.json(items);
};

const getMediaItemById = async (req, res) => {
  const mediaItem = await findMediaItemById(req.params.id);
  if (mediaItem) {
    res.json(mediaItem);
  } else {
    res.status(404).json({error: 404, message: 'Not found'});
  }
};

const postMediaItem = async (req, res) => {
  // dummy validation example
  if (!req.body.title) {
    return res.status(400).json({error: 400, message: 'Something missing!'});
  }
  console.log('new media item (mediaController)', {...req.body, ...req.file});
  const media_id = await addMediaItem({...req.body, ...req.file});
  res.status(201).json({message: 'New media item added.', media_id});
};


const putMediaItem = async (req, res) => {
  const updatedItem = await modifyMediaItem(req.params.id, req.body);
  // TODO: implement MODEL
  if (!updatedItem) {
    return res.status(404).json({error: 404, message: 'Item not found!'});
  }
  res.json({message: 'Media updated!', updatedItem});
};

const deleteMediaItem = async (req, res) => {
  const success = await deleteMediaItemById(req.params.id);
  // TODO: implement MODEL
  if (!success) {
    return res.status(404).json({error: 404, message: 'Item not found!'});
  }
  res.json({message: 'Media deleted!'});
};

export {
  getMediaItems,
  getMediaItemById,
  postMediaItem,
  putMediaItem,
  deleteMediaItem,
};
