const handler = (req, res) => {
  console.log("its handled");

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<html><body><p>hello world.</p></body></html>");
  res.end();
};

module.exports = handler;
