import { app } from "./firebase-config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const authenticationSystem = async (state, email, password) => {
  console.log("IN auth system :", email, password);
  let result = "Something went wrong";
  const authentication = getAuth();
  // state --> false => register by creating email and password
  console.log("state : ", state);
  if (!state) {
    console.log("Signing in");
    await createUserWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        console.log(response);
        sessionStorage.setItem("Auth Token", response.user.uid);
        result = "success";
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            result = `Email address already in use.`;
            break;
          case "auth/invalid-email":
            result = `Email address is invalid.`;
            break;
          case "auth/operation-not-allowed":
            result = `Error during sign up.`;
            break;
          case "auth/weak-password":
            result = "Password is not strong enough.";
            break;
          default:
            console.log(error.message);
            break;
        }
      });
  } else {
    console.log("Logging in");
    await signInWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        sessionStorage.setItem("Auth Token", response.user.uid);
        result = "success";
      })
      .catch((error) => {
        console.error(error);
        switch (error.code) {
          case "auth/email-already-in-use":
            result = `Email address already in use`;
            break;
          case "auth/wrong-password":
            result = `Enter the correct password`;
            break;
          default:
            result = "Something went wrong";
            break;
        }
      });
  }
  return result;
};

export const LogoutFirebase = async () => {
  const authentication = getAuth();
  let res = "Something went wrong";
  await signOut(authentication)
    .then(() => {
      res = "success";
      sessionStorage.removeItem("Auth Token");
    })
    .catch((err) => {
      console.log(err);
    });
  return res;
};
