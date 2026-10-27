import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// public-kansion kaikki sisältö tarjoillaan palvelimen juuri-urlissa
app.use('/', express.static('public'));

app.get('/api', (req, res) => {
  res.send('Welcome to example REST API!');
});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
