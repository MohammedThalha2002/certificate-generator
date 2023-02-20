import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getProjectFromCloud from "../services/getProjectsFromCloud";
import HomeNav from "./Components/HomeNav";

function HomePage() {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    getProjectFromCloud(setProjectData);
  }, []);

  return (
    <section className="h-screen w-full bg-bgGrey overflow-hidden flex flex-col items-center">
      {/* ADD PROJECT */}
      <HomeNav />
      <div className="w-[85%] border-2 border-white h-[65%] mt-10 rounded-t-2xl p-2
       flex flex-wrap overflow-y-scroll">
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
            <p className="text-white text-xs">{val.date}</p>
            <div
              onClick={() => {
                navigate(`/certificate/${val.projectName}`);
              }}
              className="border-2 border-white border-solid h-52 w-64 p-2 rounded-lg
       flex items-center justify-center cursor-pointer"
            >
              <img src={val.img} className="rounded-lg w-56 h-44" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomePage;