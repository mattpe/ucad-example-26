import promisePool from '../utils/database.js';

const fetchAllMediaItems = async (limit) => {
  try {
    // TODO: järjestä tulokset niin, että uusin on viimeisenä
    let result;
    if (limit) {
      result = await promisePool.query(
        'SELECT * FROM MediaItems LIMIT ' + limit,
      );
    } else {
      result = await promisePool.query('SELECT * FROM MediaItems');
    }
    const [rows] = result;
    //console.log('whole result object', result);
    //console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findMediaItemById = async (id) => {
  try {
    // prepared statement suojaa sql-injektioilta
    const sql = 'SELECT * FROM MediaItems WHERE media_id = ?';
    const params = [id];
    const result = await promisePool.execute(sql, params);
    const [rows] = result;
    //console.log('whole result object', result);
    //console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addMediaItem = async (media) => {
  if (!media.description) {
    media.description = '';
  }
  const {user_id, filename, size, mimetype, title, description} = media;
  const sql = `INSERT INTO mediaItems (user_id, filename, filesize, media_type, title, description)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, filename, size, mimetype, title, description];
  try {
    const rows = await promisePool.execute(sql, params);
    console.log('rows', rows);
    return rows[0].insertId;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const modifyMediaItem = (id, modifiedItem) => {
  //TODO: implement sql query
};

/**
 * Deletes media item from mock data array
 *
 * @param {number} id - id of the media item
 * @returns {boolean} - operation success
 */
const removeMediaItem = async (mediaId, user) => {
  let sql, params;
  try {
    // prepared statement suojaa sql-injektioilta
    if (user.user_level_id == 1) {
      // admin-käyttäjä
      sql = 'DELETE FROM MediaItems WHERE media_id = ?';
      params = [mediaId];
    } else {
      // tavallinen käyttäjä, joka on tiedoston omistaja
      sql = 'DELETE FROM MediaItems WHERE media_id = ? AND user_id = ?';
      params = [mediaId, user.user_id];
    }
    const result = await promisePool.execute(sql, params);
    const [rows] = result;
    //console.log('whole result object', result);
    console.log('rows', rows);
    return rows.affectedRows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

export {
  addMediaItem,
  fetchAllMediaItems,
  findMediaItemById,
  modifyMediaItem,
  removeMediaItem,
};
