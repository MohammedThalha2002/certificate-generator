import { useEffect } from "react";
import VerifyPage from "../Pages/Components/VerifyPage";
import { useNavigate } from "react-router-dom";

function Verify() {
  let navigate = useNavigate();

  useEffect(() => {
    let token = sessionStorage.getItem("Auth Token");

    if (token) {
      navigate("/verify");
    }
  }, []);

  return <VerifyPage />;
}

export default Verify;
