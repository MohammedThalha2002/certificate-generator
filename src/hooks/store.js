import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import certificateSlice from "./reducers/certificateSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    certificate: certificateSlice,
  },
});
