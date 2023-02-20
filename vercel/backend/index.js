const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Router = require("./routes/routes");
const allowCors = require("./cors");

const PORT = 3000;

const app = express();

// MIDDLEWARES
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb" }));
app.use(cors());
app.use(Router);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB connection error: "));
db.once("open", function () {
  console.log("DB Connected successfully");
});

app.get("/", (req, res) => {
  res.send("BACKEND RUNNING AT PORT 3000");
});

app.listen(PORT, () => {
  console.log(`SERVER STARTED at PORT : ${PORT}`);
});
