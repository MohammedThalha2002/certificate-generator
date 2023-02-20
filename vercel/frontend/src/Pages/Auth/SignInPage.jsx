import { useState } from "react";
import React from "react";
import FormData from "./FormData";
import { changeUserState } from "../../hooks/reducers/authSlice";
import { useSelector, useDispatch } from "react-redux";

function SignInPage() {
  // initially the state ==> false
  const state = useSelector((state) => state.auth.isLogin);

  if (state) {
    // state ==> true
    // Login Page
    return (
      <div className="h-screen bg-bgGrey flex justify-center items-center">
        <div className=" h-3/4 w-9/12 rounded-2xl shadow-2xl shadow-black flex overflow-hidden">
          <SignInContent text="Log In" />
          <SignInLoginInSideContent />
        </div>
      </div>
    );
  } else {
    // Sign in Page state ==> false
    return (
      <div className="h-screen bg-bgGrey flex justify-center items-center">
        <div className=" h-3/4 w-9/12 rounded-2xl shadow-2xl shadow-black flex overflow-hidden">
          <SignInContent text="Sign In" />
          <SignInLoginInSideContent />
        </div>
      </div>
    );
  }
}

function SignInContent(props) {
  return (
    <div className="sign-in h-full w-4/5 sm:w-full flex justify-center items-center">
      <div className="flex flex-col items-center text-center h-3/5">
        <h1 className="text-highlight text-4xl mb-5 font-semibold">
          {props.text}
        </h1>
        <hr className=" border-highlight w-20 mb-10 border-t-8" />
        <FormData />
      </div>
    </div>
  );
}

function SignInLoginInSideContent() {
  const state = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  let text = state ? "Sign In" : "Log In";
  return (
    <div className="h-full w-2/5 bg-highlight flex justify-center items-center sm:hidden">
      <div className="text-center flex flex-col items-center">
        <h1 className="text-white text-4xl mb-5 font-semibold">Hello!</h1>
        <hr className=" border-white w-20 mb-10 border-t-8" />
        <h2 className="text-white">
          Fill up the personal information and <br />
          start up your journey with us.
        </h2>
        <button
          type="submit"
          className=" m-6 px-8 py-2 bg-highlight
    border-white border-solid border-2 text-white rounded-3xl"
          onClick={() => dispatch(changeUserState(!state))}
        >
          {text}
        </button>
      </div>
    </div>
  );
}

export default SignInPage;
