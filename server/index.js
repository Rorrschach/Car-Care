const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

app.use(express.json());
app.use(bodyParser.json());
var cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type"],
  })
);

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

// import routes
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/car");

// routes middleware
app.all("*", (req, res, next) => {
  console.log(req.method, req.path);
  console.log(req.body);
  next();
});

app.use(express.static("public"));

//use ejs
app.set("view engine", "ejs");

// use routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// app.use('/', viewsRoutes)

app.all("*", (req, res) => {
  res.send("Looks like your are lost!");
});

mongoose
  .connect(
    "mongodb+srv://test:test123@cluster0.kztggbu.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
