import axios from "axios";

async function getProjectFromCloud(setProjectData) {
  const token = sessionStorage.getItem("Auth Token");

  await axios
    .post("http://localhost:3000/get_projects", {
      user: token,
    })
    .then((res) => setProjectData(res.data))
    .catch((err) => console.log(err));
}

export default getProjectFromCloud;
