import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "../Pages/HomePage";

function Home() {
  let navigate = useNavigate();
  useEffect(() => {
    let token = sessionStorage.getItem("Auth Token");

    if (!token) {
      return navigate("/");
    }
  }, []);
  return <HomePage />;
}

export default Home;
