const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places");
const usersRoutes = require("./routes/users");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.statusCode || 500);
  res.json({ message: error.message || "An unkown error occured!" });
});

mongoose
  .connect(
    "mongodb+srv://karim:GSkHPKNMo64wzgb4@cluster0.fjr5qww.mongodb.net/your-places"
  )
  .then(() => {
    console.log("Connected to databse!");
    app.listen(5000);
  });
