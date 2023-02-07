import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function HomePage() {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    getProjectFromCloud();
  }, []);

  async function getProjectFromCloud() {
    const token = sessionStorage.getItem("Auth Token");

    await axios
      .post("http://localhost:3000/get_projects", {
        user: token,
      })
      .then((res) => setProjectData(res.data))
      .catch((err) => console.log(err));
  }

  function createProject() {
    sessionStorage.removeItem("projectName");
  }

  function openProject(projectName) {
    sessionStorage.setItem("projectName", projectName);
  }

  return (
    <div className="h-screen w-full bg-bgGrey flex justify-center items-center">
      {/* ADD PROJECT */}
      <div
        className="border-2 border-white border-solid h-52 w-64 m-4 rounded-lg
       flex items-center justify-center cursor-pointer"
      >
        <Link onClick={createProject} to="/certificate">
          <div
            className="border-2 border-white border-dotted h-48 w-60 rounded-lg
       flex flex-col items-center justify-center"
          >
            <FontAwesomeIcon icon={faAdd} width="25px" color="white" />
            <br />
            <h1 className="text-white">Create Project</h1>
          </div>
        </Link>
      </div>
      {projectData.map((val) => (
        <div key={val._id} className="m-4">
          <p className="text-white text-xs">{val.date}</p>
          <Link to="/certificate" onClick={() => openProject(val.projectName)}>
            <div
              className="border-2 border-white border-solid h-52 w-64 p-2 rounded-lg
       flex items-center justify-center cursor-pointer"
            >
              <img
                src={val.img}
                className="rounded-lg w-56 h-44"
              />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
