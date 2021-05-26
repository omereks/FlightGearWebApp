const app = require('./app');
console.log("Hello from sejh.js");
const http = require('http');
const port = 9876;

const server = http.createServer(app);

server.listen(port);