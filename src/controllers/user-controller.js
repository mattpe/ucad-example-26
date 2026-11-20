import {addUser} from '../models/user-model.js';

const postUser = async (req, res) => {
  const newUser = req.body;
  newUser.user_level_id = 2;
  const user_id = await addUser(newUser);
  res.status(201).json({message: 'New user added.', user_id});
};

export {postUser};
