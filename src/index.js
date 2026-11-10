import express from 'express';
import mediaRouter from './routes/media-router.js';
import userRouter from './routes/user-router.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());

// public-kansion kaikki sisältö tarjoillaan palvelimen juuri-urlissa
app.use('/', express.static('public'));

// API "docs" using pug template engine
app.get('/api', (req, res) => {
  res.render('index', {
    title: 'Example REST api',
    message: 'Dummy /items endpoint API for now.',
  });
});

// All media resource routes (/api/media endpoints) are handled with media router
app.use('/api/media', mediaRouter);
// user resource endpoints
app.use('/api/users', userRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
