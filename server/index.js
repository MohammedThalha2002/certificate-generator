// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const excelToJson = require("convert-excel-to-json");
// const fs = require("fs-extra");

// const app = express();
// app.use(cors());

// var upload = multer({ dest: "uploads/" });

// app.post("/readexcel", upload.single("file"), (req, res) => {
//   try {
//     if (req.file?.filename === null || req.file?.filename === undefined) {
//       res.status(400).send("NO FILE");
//     } else {
//       var filePath = "uploads/" + req.file.filename;
//       console.log(filePath);

//       const excelData = excelToJson({
//         sourceFile: filePath,
//         header: {
//           rows: 1,
//         },
//         columnToKey: {
//           "*": "{{columnHeader}}",
//         },
//       });

//       fs.remove(filePath);
//       console.log(excelData);

//       res.status(200).send(excelData);
//     }
//   } catch (err) {
//     console.log(err);
//     res.send(err);
//   }
// });

// app.listen(3000, () => {
//   console.log("SERVER STARTED");
// });

const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).array("file");

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).send(req.files);
  });
});

app.listen(8000, () => {
  console.log("App is running on port 8000");
});
