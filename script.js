const getHTML = (query) => {
  const { group } = query || {};

  console.log("query:", query);

  return `
<html>
    <body>
        <p>hello world.</p>

        <footer>
            <a href="https://github.com/romellogoodman/books.romellogoodman.com">
                <p>source code</p>
            </a>
        </footer>
    </body>
</html>
    `;
};

const handler = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(getHTML(req.query || {}));
  res.end();
};

module.exports = handler;
