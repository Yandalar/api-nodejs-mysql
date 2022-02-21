const express = require("express");
const mysql = require("mysql");
const mycon = require("express-myconnection");
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const KEY = process.env.API_KEY;
app.set("port", process.env.PORT || 5000);
const dbOptions = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: KEY,
  database: "library",
};

//middlewares
app.use(cors());
app.use(mycon(mysql, dbOptions, "single"));
app.use(express.json());

// Server Routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.use("/api", routes);

// Server Run
app.listen(app.get("port"), () => {
  console.log(`Server runnning on port ${app.get("port")}`);
});
