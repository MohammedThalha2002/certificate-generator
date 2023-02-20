import React, { useEffect, useRef } from "react";
import { LogoutFirebase } from "../../firebase/authentications";
import textEffect from "./TextEffect";
import { useNavigate } from "react-router-dom";

function HomeNav() {
  const headTextRef = useRef();
  // NAV CONTENTS
  const home = useRef();
  const community = useRef();
  const explore = useRef();
  const contribute = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    // TEXT ANIMATION
    textEffect(headTextRef, 10);
    textEffect(home);
    textEffect(community);
    textEffect(explore);
    textEffect(contribute);
  });

  return (
    <>
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
    </>
  );
}

export default HomeNav;
