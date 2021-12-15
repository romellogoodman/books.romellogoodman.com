const fs = require("fs");
const path = require("path");

console.log("lets build books.romellogoodman.com");

const content = "Some content!";

const filePath = path.join(process.cwd(), "index.txt");

fs.writeFile(filePath, content, (err) => {
  if (err) {
    console.log("Error while writting index.html");
    console.error(err);
    return;
  }
  console.log("Success. File saved to: " + filePath);
});
