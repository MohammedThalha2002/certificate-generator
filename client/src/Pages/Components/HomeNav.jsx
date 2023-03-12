import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutFirebase } from "../../firebase/authentications";
import textEffect from "./TextEffect";

function HomeNav({ title }) {
  const headTextRef = useRef();
  // NAV CONTENTS
  const home = useRef();
  const verify = useRef();
  const explore = useRef();
  const contribute = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    // TEXT ANIMATION
    if (title) {
      textEffect(headTextRef, 10);
    }
    textEffect(home);
    textEffect(verify);
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
          <h1
            ref={home}
            data-value="HOME"
            className="cursor-pointer"
            onClick={() => navigate("/home")}
          >
            HOME
          </h1>
          <h1
            ref={verify}
            className="cursor-pointer"
            data-value="VERIFY"
            onClick={() => navigate("/verify")}
          >
            VERIFY
          </h1>
          <h1 ref={explore} data-value="EXPLORE" className="cursor-pointer">
            EXPLORE
          </h1>
          <h1
            ref={contribute}
            data-value="CONTRIBUTE"
            className="cursor-pointer"
          >
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
      {title ? (
        <div className="h-1/4 flex items-end justify-center">
          <h1
            ref={headTextRef}
            style={{
              fontFamily: "Space Mono",
            }}
            className="text-white font-bold text-5xl text-center"
            data-value="CREATE UNLIMITED CERTIFICATES IN SECONDS"
          >
            CREATE UNLIMITED CERTIFICATES IN SECONDS
          </h1>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default HomeNav;
