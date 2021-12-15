# books.romellogoodman.com

A Book Catalog Website.

Built using [Node v16](https://nodejs.org/). `script.js` is a node function that parses the CSV and returns the html.

### Development

```
# Install dependencies
npm install

# Start dev server
npm run dev
```

### Deployment

This project deploys using vercel. The `api/index.js` file requires `script.js` as a request handler.
