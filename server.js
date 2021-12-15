const http = require("http");

const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<html><body><p>hello world.</p></body></html>");
  res.end();
});

server.listen(3000);

console.log("started server on: http://localhost:3000");
