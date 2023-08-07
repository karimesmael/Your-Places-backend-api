const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use((req, res) => {
  res.end("<h1> Hello from Node.js <h1/>");
});

app.listen(5000);
