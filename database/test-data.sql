
-- Insert users
INSERT INTO Users VALUES (null, 'VCHar', 'secret123', 'vchar@example.com', 1, null);
INSERT INTO Users VALUES (null, 'Donatello', 'secret234', 'dona@example.com', 1, null);


-- Inserting multiple records at once
INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type) 
  VALUES ('ffd8.jpg', 887574, 'Favorite drink', null, 305, 'image/jpeg'),
         ('dbbd.jpg', 60703, 'Miika', 'My Photo', 305, 'image/jpeg'),
         ('2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg');


-- Add test queries here?
-- Select all media items along with the username of the owner using a (inner) join:
SELECT MediaItems.media_id, MediaItems.filename, Users.username 
  FROM MediaItems 
  JOIN Users ON MediaItems.user_id = Users.user_id;
