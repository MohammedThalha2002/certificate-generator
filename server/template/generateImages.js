const hbs = require("handlebars");
const fs = require("fs-extra");
const path = require("path");
const puppeteer = require("puppeteer");
const steggy = require("steggy-noencrypt");
const getDate = require("../helpers/getDate");
const crypto = require("crypto");

const compile = async function (data) {
  const filePath = path.join(process.cwd(), "template", "index.hbs");

  const html = await fs.readFile(filePath, "utf8");
  hbs.registerHelper("getPosX", (per) => {
    const width = (per * data.width) / 100 + "px";
    return width;
  });
  hbs.registerHelper("getPosY", (per) => {
    const height = (per * data.height) / 100 + "px";
    return height;
  });
  hbs.registerHelper("addPX", (data) => {
    return data + "px";
  });
  return hbs.compile(html)(data);
};

const generate = async (req, res) => {
  // try {
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();
  //   const content = await compile(data);
  //   await page.setContent(content);
  //   await page.emulateMediaType("screen");
  //   await page.screenshot({
  //     path: "out/output.png",
  //     omitBackground: true,
  //   });
  //   console.log("done creating pdf");
  //   await browser.close();
  //   res.send("DONEEE.....");
  // } catch (e) {
  //   console.log(e);
  //   res.send("ERRORRAAAEEE.....");
  // }
};

const singleGenerate = async (req, res) => {
  console.log("PNG CREATION STARTED...");
  const data = req.body;
  console.log(req.body);
  if (data.image.includes("blob")) {
    //
    // console.log(data.file);
    // console.log(URL.createObjectURL(data.file));
  }
  try {
    const browser = await puppeteer.launch({
      // headless: false,
      // executablePath:
      //   "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: Math.round(data.width),
      height: Math.round(data.height),
    });
    const content = await compile(data);

    await page.setContent(content);
    await page.emulateMediaType("screen");

    await page.screenshot({
      path: "out/output.png",
      omitBackground: true,
    });

    let encodingData = {
      id: crypto.randomBytes(16).toString("hex"),
      date: getDate(),
      user: "Mohammed Thalha",
      cert_printed: "single",
    };

    await stegnograph(encodingData);

    console.log("Done creating png");
    res.send("DONEAAAAE.....");
    await browser.close();
  } catch (e) {
    console.log(e);
    res.send("ERRORRAAAEEE.....");
  }
};

const stegnograph = async (data) => {
  console.log(".....ENCODING IMAGE....");
  const file = path.join(process.cwd(), "out", "output.png");

  const original = fs.readFileSync(file);
  const message = JSON.stringify(data);
  const concealed = steggy.conceal(original, message);
  fs.writeFileSync(file, concealed);
};

const sendFile = (req, res) => {
  try {
    res.sendFile(path.join(process.cwd(), "out/output.png"));
  } catch (error) {
    console.log("Error in sending the file", error);
    res.send("ERROR");
  }
};

const decodeMsg = (req, res) => {
  console.log(".....DECODING MSG....");
  try {
    const file = path.join(process.cwd(), req.file.path);
    const image = fs.readFileSync(file);
    const revealed = steggy.reveal(image);
    fs.unlinkSync(file);
    res.send(revealed.toString());
  } catch (error) {
    console.log("ERROR IM DECODING MSG", error);
    res.send("ERROR");
  }
};

module.exports = { generate, singleGenerate, sendFile, decodeMsg };
