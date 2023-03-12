import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import getProjectFromCloud from "../services/getProjectsFromCloud";
import HomeNav from "./Components/HomeNav";
import { deleteProject } from "../services/deleteProject";
import { ToastContainer, toast } from "react-toastify";

function HomePage() {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [deleteState, setDeleteState] = useState(false);

  useEffect(() => {
    getProjectFromCloud(setProjectData);
  }, [deleteState]);

  return (
    <section className="h-screen w-full bg-bgGrey overflow-hidden flex flex-col items-center">
      {/* ADD PROJECT */}
      <ToastContainer />
      <HomeNav title={true} />
      <div
        className="w-[85%] border-2 border-white h-[65%] mt-10 rounded-t-2xl p-2
       flex flex-wrap overflow-y-scroll"
      >
        {/* CREATE PROJECT DIV */}
        <div
          className="border-2 border-white border-solid h-52 w-64 m-4 mt-6 rounded-lg
       flex items-center justify-center cursor-pointer"
        >
          <div
            onClick={() => {
              navigate(`/certificate/new`);
            }}
            className="border-2 border-white border-dotted h-48 w-60 rounded-lg
       flex flex-col items-center justify-center"
          >
            <FontAwesomeIcon icon={faAdd} width="25px" color="white" />
            <br />
            <h1 className="text-white">Create Project</h1>
          </div>
        </div>
        {/* SAVED PROJECTS DIV */}
        {projectData.map((val) => (
          <div key={val._id} className="m-2">
            <div className="flex justify-between items-center">
              <p className="text-white text-xs">{val.date}</p>
            </div>
            <div
              className="border-2 border-white border-solid h-52 w-64 p-2 rounded-lg relative
              flex items-center justify-center cursor-pointer"
            >
              <div
                onClick={() => {
                  deleteProject(val.projectName, toast, setDeleteState);
                }}
                className="bg-white h-[25px] w-[25px] rounded-[50%] mb-[1px] absolute top-2 right-2
               flex justify-center items-center"
              >
                <FontAwesomeIcon icon={faTrash} width="12px" color="#2C2C2C" />
              </div>
              <img
                src={val.img}
                onClick={() => {
                  navigate(`/certificate/${val.projectName}`);
                }}
                className="rounded-lg w-56 h-44"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomePage;
