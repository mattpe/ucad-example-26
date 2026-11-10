import promisePool from '../utils/database.js';

const fetchAllMediaItems = async (limit) => {
  try {
    const result = await promisePool.query('SELECT * FROM MediaItems');
    const [rows] = result;
    console.log('whole result object', result);
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findMediaItemById = (id) => {
  const itemFound = mediaItems.find((item) => id == item.media_id);
  return itemFound;
};

const addMediaItem = (item) => {
  item.media_id = mediaItems[0].media_id + 1;
  mediaItems.unshift(item);
};

const modifyMediaItem = (id, modifiedItem) => {
  const itemIndex = mediaItems.findIndex((item) => id == item.media_id);
  if (itemIndex > -1) {
    mediaItems[itemIndex] = {...mediaItems[itemIndex], ...modifiedItem};
    return mediaItems[itemIndex];
  }
  return false;
};


/**
 * Deletes media item from mock data array
 * 
 * @param {number} id - id of the media item 
 * @returns {boolean} - operation success
 */
const deleteMediaItemById = (id) => {
  const itemIndex = mediaItems.findIndex((item) => id == item.media_id);
  if (itemIndex > -1) {
    mediaItems.splice(itemIndex, 1);
    return true;
  }
  return false;
};

export {
  addMediaItem,
  fetchAllMediaItems,
  findMediaItemById,
  modifyMediaItem,
  deleteMediaItemById,
};
