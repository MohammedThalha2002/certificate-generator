import React, { useState, memo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

function LeftSideBar({
  textLayers,
  selectedText,
  setSelectedText,
  handleLayerClick,
  handleEditPenClick,
  delLayer,
  nameChangeSelected,
  setNameChange,
  nameChange,
  setChangeToNameFromInput,
  addLayer,
  setTextName,
  setFontSize,
  setFontWeight,
  setTextColor,
  setFontFamily,
  uploadAssetImage,
}) {
  const [layerClick, setLayerClick] = useState(true);
  const [assetsClick, setAssetsClick] = useState(false);

  const assets = [
    "https://i.postimg.cc/Dzzvx6M3/1.png",
    "https://i.postimg.cc/mrcxc5nk/10.png",
    "https://i.postimg.cc/xjm0pct8/2.png",
    "https://i.postimg.cc/kGPdPvf4/3.png",
    "https://i.postimg.cc/K8pS82JC/4.png",
    "https://i.postimg.cc/RV9zPGWp/5.png",
    "https://i.postimg.cc/cLFZtY49/6.png",
    "https://i.postimg.cc/j57r1F6m/7.png",
    "https://i.postimg.cc/0jG1kKBC/8.png",
    "https://i.postimg.cc/k5ZmfmSW/9.png",
  ];

  function LayerClick() {
    console.log("layer click");
    setLayerClick(true);
    setAssetsClick(false);
  }

  function AssetsClick() {
    console.log("assets click");
    setLayerClick(false);
    setAssetsClick(true);
  }

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
          <h1
            onClick={() =>
              handleLayerClick(
                val.id,
                val.val,
                val.color,
                val.fontWeight,
                val.fontSize,
                val.fontFamily
              )
            }
            className="select-none w-full text-start"
          >
            {val.name}
          </h1>
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

  const Assets = memo(() => {
    return (
      <div
        style={{
          overflowAnchor: "auto",
        }}
        className="w-full h-[100vh] overflow-y-scroll"
      >
        {assets.map((val) => (
          <img
            key={Math.random()}
            // style={{
            //   backgroundColor: assetSelected == val ? "#788C9E" : "",
            // }}
            onClick={() => uploadAssetImage(val)}
            src={val}
            className="p-4 cursor-pointer"
          />
        ))}
      </div>
    );
  });

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
        flex justify-around items-center text-white cursor-pointer"
        >
          <h1
            style={{
              fontWeight: layerClick ? "600" : "300",
            }}
            onClick={LayerClick}
          >
            Layers
          </h1>
          <h1
            style={{
              fontWeight: assetsClick ? "600" : "300",
            }}
            onClick={AssetsClick}
          >
            Assets
          </h1>
          <FontAwesomeIcon
            icon={faPlus}
            className="cursor-pointer"
            onClick={addLayer}
          />
        </div>
        {layerClick ? <Layers /> : <Assets />}
        <div
          className="h-full"
          onClick={() => {
            setSelectedText("");
            setTextName("");
            setTextColor("");
            setFontWeight("");
            setFontSize("");
            setFontFamily("");
          }}
        ></div>
      </div>
    </>
  );
}

export default LeftSideBar;
