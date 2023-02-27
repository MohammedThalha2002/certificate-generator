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

  return (
    <>
      <div
        style={{
          display: nameChangeSelected ? "block" : "none",
        }}
        className="h-[30vh] z-50 w-[40vw] -translate-x-[50%] -translate-y-[50%]
       bg-[#363636] rounded-md absolute left-1/2 top-1/2 shadow-lg text-center"
      >
        <h1 className="text-white mt-12">Enter the unique Name</h1>
        <input
          type="text"
          className="mt-8 p-2 w-[25vw]"
          value={nameInEditInput || ""}
          onChange={(e) => dispatch(changeNameInEditInput(e.target.value))}
        />
        <br />
        <button
          className="bg-white px-6 py-1 rounded-md m-8"
          onClick={() => {
            dispatch(setNameChangeFromEditInput());
            setNameChangeSelected(!nameChangeSelected);
          }}
        >
          Set
        </button>
      </div>
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
