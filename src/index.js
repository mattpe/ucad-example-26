import http from 'http';
const hostname = '127.0.0.1';
const port = 3000;

// dummy mock data
const items = [
  {id: 1, name: 'Item 1'},
  {id: 2, name: 'Item 2'},
  {id: 6, name: 'Item 6'},
  {id: 8, name: 'Item 8'},
];

const notFound = (response) => {
  response.writeHead(404, {'Content-Type': 'text/html'});
  response.end('<p>404 - Not Found</p>');
};

const server = http.createServer((req, res) => {
  console.log('Request', req.method, req.url);
  // split request url to resource name and resource id
  const [, resource, id] = req.url.split('/');

  // GET root
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<p>Tervetuloa esimerkkirajapintaan</p>');
    // GET /items
  } else if (req.method === 'GET' && resource === 'items') {
    if (id) {
      const item = items.find((item) => id == item.id);
      if (!item) {
        notFound(res);
        return;
      }
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(item));
    } else {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(items));
    }
    res.end();
  // POST /items
  } else if (req.method === 'POST' && resource === 'items') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk.toString();
    });
    req.on('end', () => {
      console.log('POST data:', data);
      // Create ne object based on posted json data
      const newItem = JSON.parse(data);
      newItem.id = items[items.length-1].id + 1;
      items.push(newItem);
      res.writeHead(201, {'Content-Type': 'application/json'});
      res.end('{"message": "Data received"}');
    });

    // Default 404 error responsse
  } else {
    notFound(res);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
