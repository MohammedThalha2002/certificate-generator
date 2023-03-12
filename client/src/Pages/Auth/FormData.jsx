import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAndPassword,
  addUsername,
} from "../../hooks/reducers/authSlice";
import { useState } from "react";
import { authenticationSystem } from "../../firebase/authentications";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../../services/showToast";

function FormData() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showpassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth.isLogin);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      toast.error("Enter your Email and Password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    dispatch(
      addUserAndPassword({
        user: email,
        password: password,
      })
    );
    await authenticationSystem(state, email, password, name).then((res) => {
      if (res == "success") {
        showToast(toast, "success", "Login Successfully")
        navigate("/home");
      } else {
        showToast(toast, "error", res);
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <form className=" mt-8 mb-0 w-full space-y-4">
        {!state ? (
          <div>
            <label htmlFor="Username" className="sr-only">
              Name
            </label>

            <div className="relative w-full">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                placeholder="Enter Username"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>

          <div className="relative w-full">
            <input
              type="text"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <input
              type={showpassword ? "text" : "password"}
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <span
              className="absolute inset-y-0 right-4 cursor-pointer inline-flex items-center"
              onClick={() => setShowPassword(!showpassword)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className=" px-8 py-2 bg-highlight text-white rounded-3xl"
        >
          SUBMIT
        </button>
      </form>
    </>
  );
}

export default FormData;
