import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

function LeftSideBar({
  disablePointer,
  textLayers,
  selectedText,
  handleLayerClick,
  handleEditPenClick,
  delLayer,
  nameChangeSelected,
  setNameChange,
  nameChange,
  setChangeToNameFromInput,
  addLayer,
}) {
  function Layers() {
    return textLayers.map((val) => (
      <div
        key={val.id}
        style={{
          backgroundColor: selectedText == val.id ? "#788C9E" : "",
        }}
        className="w-full h-[50px] pl-6 cursor-pointer
        flex justify-start items-center text-white"
      >
        <div className="w-full flex justify-start items-center">
          <FontAwesomeIcon
            icon={faPen}
            width="10px"
            className="cursor-pointer pr-6 pt-1"
            onClick={() => handleEditPenClick(val.id, val.name)}
          />
          <h1 onClick={() => handleLayerClick(val.id)} className=" select-none">
            {val.name}
          </h1>
          <div className=" w-full"></div>
        </div>
        <FontAwesomeIcon
          icon={faTrash}
          width="10px"
          className="cursor-pointer pr-4 pt-1"
          onClick={() => delLayer(val.id)}
        />
      </div>
    ));
  }

  return (
    <>
      {/* top layers for entering name */}
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
          value={nameChange || ""}
          onChange={(e) => setNameChange(e.target.value)}
        />
        <br />
        <button
          className="bg-white px-6 py-1 rounded-md m-8"
          onClick={setChangeToNameFromInput}
        >
          Set
        </button>
      </div>
      <div
        style={{
          display: nameChangeSelected ? "block" : "none",
        }}
        className="h-screen w-full absolute top-0
        opacity-40 bg-[#2C2C2C]"
      ></div>
      {/* left bar */}
      <div
        className="bg-greyHighlight h-screen w-[20%] 
      border-stroke border-solid border-[1px]"
      >
        <div
          className="w-full h-[50px] border-stroke border-solid border-b-[1px]
        flex justify-around items-center text-white"
        >
          <h1>Layers</h1>
          <h1>Assets</h1>
          <FontAwesomeIcon
            icon={faPlus}
            className="cursor-pointer"
            onClick={addLayer}
          />
        </div>
        <Layers />
        <div className="h-full" onClick={disablePointer}></div>
      </div>
    </>
  );
}

export default LeftSideBar;
