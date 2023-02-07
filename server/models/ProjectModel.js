const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  layers: {
    type: Object,
    required: true,
  },
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
