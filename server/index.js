const express = require("express");
const cors = require("cors");
const multer = require("multer");
const excelToJson = require("convert-excel-to-json");
const fs = require("fs-extra");

const app = express();

var upload = multer({ dest: "uploads/" });

app.post("/read", upload.single("file"), (req, res) => {
  try {
    if (req.file?.filename === null || req.file?.filename === undefined) {
      res.status(400).send("NO FILE");
    } else {
      var filePath = "uploads/" + req.file.filename;
      console.log(filePath);

      const excelData = excelToJson({
        sourceFile: filePath,
        header: {
          rows: 1,
        },
        columnToKey: {
          "*": "{{columnHeader}}",
        },
      });

      fs.remove(filePath);
      console.log(excelData);

      res.status(200).send(excelData);
    }
  } catch (err) {
    res.send(err);
  }
});

app.listen(3000, () => {
  console.log("SERVER STARTED");
});
