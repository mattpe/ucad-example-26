import express from 'express';
import items, {getItemById} from './items.js';
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

// Items API resource
app.get('/api/items', (req, res) => {
  console.log('query params object', req.query);
  // TODO: replace using getItems(req.query.limit)
  let response = items;
  if (req.query.limit) {
    response = items.splice(0, req.query.limit);
  }
  res.json(response);
});
app.get('/api/items/:id/', (req, res) => {
  console.log('req params:', req.params);
  // TODO: send only chosen item
  const item = getItemById(req.params.id);
  res.json(item);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
