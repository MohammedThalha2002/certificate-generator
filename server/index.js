const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Router = require("./routes/routes");
const multer = require("multer");
const { decodeMsg } = require("./template/generateImages");
// const predictCertificate = require("./services/predictCertificate");

const PORT = 3000;

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "out/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const whitelist = ["http://localhost:8080"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// MIDDLEWARES
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb" }));
app.use(cors(corsOptions));
app.use(Router);

mongoose.connect(
  "mongodb://MohammedThalha:Thalha2002@ac-lhvvwum-shard-00-00.r1i2q4n.mongodb.net:27017,ac-lhvvwum-shard-00-01.r1i2q4n.mongodb.net:27017,ac-lhvvwum-shard-00-02.r1i2q4n.mongodb.net:27017/?ssl=true&replicaSet=atlas-l3r3qk-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB connection error: "));
db.once("open", function () {
  console.log("DB Connected successfully");
});

app.get("/", (req, res) => {
  res.send("BACKEND RUNNING AT PORT 3000");
});

app.post("/image-decode", upload.single("file"), (req, res) => {
  console.log(req.file.path);
  decodeMsg(req, res);
});

app.post("/predict-certificate", (req, res) => {
  // console.log(req.file.path);
  // predictCertificate(req, res);
});

app.listen(PORT, () => {
  console.log(`SERVER STARTED at PORT : ${PORT}`);
});
