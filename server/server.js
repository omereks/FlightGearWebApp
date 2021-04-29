const app = require('./app');

const http = require('http');
const port = 9876;

const server = http.createServer(app);

server.listen(port);