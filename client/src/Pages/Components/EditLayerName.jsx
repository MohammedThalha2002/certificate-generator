import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeNameInEditInput,
  setNameChangeFromEditInput,
} from "../../hooks/reducers/certificateSlice";

function EditLayerName({ nameChangeSelected, setNameChangeSelected }) {
  const nameInEditInput = useSelector(
    (state) => state.certificate.nameInEditInput
  );
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setNameChangeFromEditInput());
    setNameChangeSelected(!nameChangeSelected);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: nameChangeSelected ? "flex" : "none",
          }}
          className="h-[30vh] z-50 w-[40vw] -translate-x-[50%] -translate-y-[50%]
       bg-[#363636] rounded-md absolute left-1/2 top-1/2 shadow-lg text-center 
       flex flex-col justify-evenly items-center"
        >
          <div>
            <h1 className="text-white mb-5">Enter the unique Name</h1>
            <input
              type="text"
              className="p-2 w-[25vw]"
              value={nameInEditInput || ""}
              onChange={(e) => dispatch(changeNameInEditInput(e.target.value))}
            />
          </div>
          <button className="bg-white px-6 py-1 rounded-md" type="submit">
            Set
          </button>
        </div>
      </form>
      {/* BACKGROUND BLUR FOR NAME CHANGING INPUT */}
      <div
        style={{
          display: nameChangeSelected ? "block" : "none",
        }}
        className="h-screen w-full absolute top-0
        opacity-40 bg-[#2C2C2C]"
      ></div>
    </>
  );
}

export default EditLayerName;
