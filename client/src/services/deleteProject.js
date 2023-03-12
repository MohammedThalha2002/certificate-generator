import axios from "axios";
import { showToast } from "./showToast";

export const deleteProject = async (id, toast, setDeleteState) => {
  axios
    .delete(`http://localhost:3000/delete-project/${id}`)
    .then((res) => {
      console.log("successfully deleted", res);
      showToast(toast, "success", "Deleted Successfully");
      setDeleteState(true);
    })
    .catch((err) => {
      console.log(err);
      showToast(toast, "error", "Failed to Delete");
    });
};
