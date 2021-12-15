# books.romellogoodman.com

A Book Catalog Website.

Built using [Node v16](https://nodejs.org/). `script.js` is a node function that parses the CSV and returns the html. To generate the data I export my library from [goodreads](https://www.goodreads.com/review/import) and convert the `.csv` to `.json` using a website.

### Development

```
# Install dependencies
npm install

# Start dev server
npm run dev
```

### Deployment

This project deploys using vercel. The `api/index.js` file requires `script.js` as a request handler.
