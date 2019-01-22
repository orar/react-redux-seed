const jsonServer = require('json-server');
const createExpressServer = require('express');
const createRoutes = require('./routes');

const server = createExpressServer();

// Rewrite Urls leading with /api/...
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
}));

// Enable data parsing for POST
server.use(jsonServer.bodyParser);

const port = 9000;

createRoutes(server).then(() => server.listen(port, () => {
  console.log(`Fake Server is running at http://localhost:${port}`);
}));
