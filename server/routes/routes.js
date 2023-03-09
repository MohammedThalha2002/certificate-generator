const express = require("express");
const app = express();
const projectModel = require("../models/ProjectModel");
const UserModel = require("../models/UserModel");
const uploadImage = require("../UploadImg");
const {
  generate,
  singleGenerate,
  sendFile,
} = require("../template/generateImages");

app.post("/create-user", async (req, res) => {
  const user = new UserModel(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get("/find-user/:id", async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await UserModel.find({
      userId: userID,
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/add_project", async (req, res) => {
  const project = new projectModel(req.body);

  try {
    await project.save();
    res.send(project);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/get_projects", async (req, res) => {
  const userId = req.body.user;
  const project = await projectModel.find({
    user: userId,
  });

  try {
    res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/get_project_by_id", async (req, res) => {
  const projectName = req.body.projectName;
  const project = await projectModel.find({
    projectName: projectName,
  });

  try {
    res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/update_project", async (req, res) => {
  const userId = req.body.user;
  const projectName = req.body.projectName;
  const values = req.body.values;
  const query = { user: userId, projectName };
  const update = { $set: values };
  const options = { upsert: true };
  const project = await projectModel.updateOne(query, update, options);

  try {
    res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/delete-project/:id", async (req, res) => {
  const projectName = req.params.id;
  const project = await projectModel.deleteOne({
    projectName: projectName,
  });

  try {
    res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

app.post("/export-png", (req, res) => {
  singleGenerate(req, res);
});

app.get("/get-file", (req, res) => {
  sendFile(req, res);
});

app.get("/multi-generate", (req, res) => {
  generate(req, res);
});

module.exports = app;
