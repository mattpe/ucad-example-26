import promisePool from '../utils/database.js';


const selectUserByUsername = async (username) => {
  try {
    // prepared statement suojaa sql-injektioilta
    const sql = 'SELECT * FROM Users WHERE username = ?';
    const params = [username];
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

const addUser = async (user) => {
  const {username, password, email, user_level_id} = user;
  const sql = `INSERT INTO Users (username, password, email, user_level_id)
               VALUES (?, ?, ?, ?)`;
  const params = [username, password, email, user_level_id];
  try {
    const rows = await promisePool.execute(sql, params);
    //console.log('add user rows', rows);
    return rows[0].insertId;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

export {selectUserByUsername, addUser};