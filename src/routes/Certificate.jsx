import React, {useEffect} from "react";
import CertificatePage from "../Pages/CertificatePage";
import { useNavigate } from "react-router-dom";

function Certificate() {
  let navigate = useNavigate();
  useEffect(() => {
    let token = sessionStorage.getItem("Auth Token");

    if (!token) {
      return navigate("/");
    }
  }, []);
  return <CertificatePage />;
}

export default Certificate;
