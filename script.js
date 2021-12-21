const goodreads = require("./goodreads.json");

const GROUP_AUTHOR = "author";
const GROUP_TITLE = "title";
const GROUP_YEAR = "year";

const filterRecords = (records) => {
  return records.filter((record) => record["Exclusive Shelf"] === "read");
};

const groupRecords = (records, key = "title") => {
  const groupBys = {
    [GROUP_AUTHOR]: {
      recordKey: "Author",
      groupBy: (value) => value,
    },
    [GROUP_YEAR]: {
      recordKey: "Date Read",
      groupBy: (value) => value.slice(0, value.indexOf("/")) || "Year Unknown",
    },
    [GROUP_TITLE]: {
      recordKey: "Title",
      groupBy: (value) => value.charAt(0),
    },
  };
  const { recordKey, groupBy } = groupBys[key];
  const groups = records.reduce((dictionary, item) => {
    const groupValue = item[recordKey];
    const groupKey = groupBy(groupValue);

    // Group initialization
    if (!dictionary[groupKey]) {
      dictionary[groupKey] = [];
    }

    // Grouping
    dictionary[groupKey].push(item);

    return dictionary;
  }, {});

  return groups;
};

const getHTML = async (groups) => {
  const keys = Object.keys(groups || {}).sort();
  const books = keys
    .map((key) => {
      const items = (groups[key] || []).sort((a, b) => {
        return a.Title > b.Title ? 1 : -1;
      });

      return `
        <div>
          <h6>${key}</h6>
          ${items
            .map((item) => {
              const { Title: title } = item;
              return `
              <p>${title}</p>
            `;
            })
            .join("\n")}
        </div>
      `;
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
            <div>
              <div>
                <p>Last Update: 12-21-2021</p>
                <p>
                  Group By:
                  <a href="/?group=${GROUP_AUTHOR}">
                    <span>Author</span>
                  </a>
                  <a href="/?group=${GROUP_TITLE}">
                    <span>Title</span>
                  </a>
                  <a href="/?group=${GROUP_YEAR}">
                    <span>Year</span>
                  </a>
                </p>
              </div>
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

const getQueryParams = (url) => {
  // url -> ?key=param -> key=param
  const query = url.substr(1);
  const result = {};

  query.split("&").forEach((part) => {
    const item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });

  return result;
};

const handler = async (req, res) => {
  // req.url -> /?key=param -> ?key=param
  const query = getQueryParams(req.url.slice(1) || "");
  const { group = "title" } = query;
  const records = filterRecords(goodreads);
  const groups = groupRecords(records, group);
  const html = await getHTML(groups);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(html);
  res.end();
};

module.exports = handler;
