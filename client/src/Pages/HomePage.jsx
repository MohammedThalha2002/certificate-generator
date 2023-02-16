import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { LogoutFirebase } from "../firebase/authentications";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const headTextRef = useRef();
  // NAV CONTENTS
  const home = useRef();
  const community = useRef();
  const explore = useRef();
  const contribute = useRef();

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    // TEXT ANIMATION
    textEffect(headTextRef, 10);
    textEffect(home);
    textEffect(community);
    textEffect(explore);
    textEffect(contribute);
  });

  const textEffect = (baseText, intervalTime) => {
    let interval = null;
    baseText.current.onmouseover = (event) => {
      let iteration = 0;
      clearInterval(interval);
      interval = setInterval(() => {
        event.target.innerText = event.target.innerText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return event.target.dataset.value[index];
            }

            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= event.target.dataset.value.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, intervalTime || 20);
    };
  };

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
    <section className="h-screen w-full bg-bgGrey overflow-hidden flex flex-col items-center">
      {/* ADD PROJECT */}
      <nav className="h-[10%] w-full flex items-center justify-between p-2">
        <div
          style={{
            fontFamily: "Solitreo",
          }}
          className=" text-white text-4xl font-semibold pt-3"
        >
          ZARO
        </div>
        <div className="w-1/2 text-white text-2xl font-semibold flex justify-evenly">
          <h1 ref={home} data-value="HOME">
            HOME
          </h1>
          <h1 ref={community} data-value="COMMUNITY">
            COMMUNITY
          </h1>
          <h1 ref={explore} data-value="EXPLORE">
            EXPLORE
          </h1>
          <h1 ref={contribute} data-value="CONTRIBUTE">
            CONTRIBUTE
          </h1>
        </div>
        <div>
          <button
            onClick={async () => {
              let res = await LogoutFirebase();
              console.log(res);
              if (res === "success") {
                navigate("/");
              }
            }}
            className="bg-highlight px-3 py-2 rounded-lg font-medium text-white"
          >
            Log Out
          </button>
        </div>
      </nav>
      <div className="h-1/4 flex items-end justify-center">
        <h1
          ref={headTextRef}
          style={{
            fontFamily: "Space Mono",
          }}
          className="text-white font-bold text-5xl"
          data-value="CREATE UNLIMITED CERTIFICATES IN SECONDS"
        >
          CREATE UNLIMITED CERTIFICATES IN SECONDS
        </h1>
      </div>
      <div className="w-[85%] border-2 border-white h-[65%] mt-10 rounded-t-3xl flex flex-wrap">
        {/* CREATE PROJECT DIV */}
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
          <div key={val._id} className="mr-4">
            <p className="text-white text-xs">{val.date}</p>
            <Link
              to="/certificate"
              onClick={() => openProject(val.projectName)}
            >
              <div
                className="border-2 border-white border-solid h-52 w-64 p-2 rounded-lg
       flex items-center justify-center cursor-pointer"
              >
                <img src={val.img} className="rounded-lg w-56 h-44" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomePage;
