const http = require("http");
const handler = require("./script");
const server = http.createServer(handler);

server.listen(3000);

console.log("started server on: http://localhost:3000");
