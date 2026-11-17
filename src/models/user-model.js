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

export {selectUserByUsername};