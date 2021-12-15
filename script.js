const goodreads = require("./goodreads.json");

const getRecords = async (query) => {
  console.log("query:", query);

  const { group } = query || {};
  const records = goodreads
    .map((item) => {
      return item.Title;
    })
    .filter((item) => item)
    .sort();

  return records;
};

const getHTML = async (records) => {
  const books = (records || [])
    .map((title) => {
      return `<p>${title}</p>`;
    })
    .join("\n");

  return `
<html lang="en">
    <head>
        <title>Books | Romello Goodman</title>
        <meta name="description" content="A Book Catalog for Romello Goodman.">
        <meta charset="utf-8">
        <meta name="keywords" content="Romello Goodman">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/png" href="https://romellogoodman.com/favicon.png">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;700&display=swap" rel="stylesheet">
        <script src="https://cdn.usefathom.com/script.js" data-site="XRTIFTNI" defer></script>
        <style>
            /* Reset */

            * {
            vertical-align: baseline;
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            font-family: inherit;
            font-style: inherit;
            font-size: 100%;
            }

            /* Styles */

            body {
            margin: 32px 0;
            padding: 0px 8px;
            font-family: "Public Sans", sans-serif;
            font-size: 18px;
            font-weight: 400;
            line-height: 1.25;
            word-wrap: break-word;
            font-kerning: normal;
            background: white;
            }

            h2,
            h6,
            p {
            margin-bottom: 8px;
            }

            a {
            color: #2188ff;
            text-decoration: none;
            }

            a:hover,
            a:hover p {
            text-decoration: underline;
            }

            img {
            width: 100%;
            }

            header,
            main,
            footer {
            margin: auto;
            max-width: 800px;
            }

            header {
            margin-bottom: 16px;
            max-width: 800px;
            }

            h1 {
            font-size: 24px;
            }

            h2 {
            font-size: 18px;
            }

            .bar {
            margin: 8px 0;
            height: 10px;
            background: black;
            }

            .mini-bar {
            margin: 32px auto;
            height: 10px;
            background: black;
            width: 50px;
            }

            header p {
            display: inline-block;
            margin-right: 8px;
            }
        </style>
    </head>
    <body>
        <header>
            <h1>books.romellogoodman.com</h1>
            <a href="https://romellogoodman.com">
                <p>home</p>
            </a>
            <a href="https://github.com/romellogoodman/books.romellogoodman.com">
                <p>source code</p>
            </a>
            <div class="bar" />
        </header>
        <body>
            <main>
                ${books}
            </main>
        </body>
        <footer>
            <div class="mini-bar" />
        </footer>
    </body>
</html>
    `;
};

const handler = async (req, res) => {
  const records = await getRecords(req.query || {});
  const html = await getHTML(records);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(html);
  res.end();
};

module.exports = handler;
