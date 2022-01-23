const http = require('http');
const handler = require('./routes.js');

const server = http.createServer(handler);

server.listen(3000);