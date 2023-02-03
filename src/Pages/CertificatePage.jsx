import React, { useState, useEffect, useRef } from "react";
import LeftSideBar from "../Components/LeftSideBar";
import RightSideBar from "../Components/RightSideBar";

function CertificatePage() {
  const pointerRef = useRef();
  const parentPointerRef = useRef();
  const [file, setFile] = useState();
  const [mousPos, setMousPos] = useState({});
  const [pointers, setPointers] = useState([]);
  const [selectedText, setSelectedText] = useState();
  const [nameChangeSelected, setNameChangeSelected] = useState(false);
  const [nameChange, setNameChange] = useState();
  const [textLayers, setTextLayers] = useState([
    {
      id: 0.3,
      name: "Name",
    },
    {
      id: 0.5,
      name: "Position",
    },
  ]);

  function addLayer() {
    let layer = {
      id: Math.random(),
      name: "Text",
    };
    setTextLayers([...textLayers, layer]);
  }
  function delLayer(id) {
    const newDelLayer = textLayers.filter((val) => val.id != id);
    setTextLayers(newDelLayer);
  }

  function handleLayerClick(id) {
    setSelectedText(id);
    if (file) {
      enablePointer();
    }
  }

  function handleDoubleClick(id) {
    setNameChangeSelected(!nameChangeSelected);
  }

  function setChangeToNameFromInput() {
    const updatedTextNameLayers = textLayers.map((val) => {
      if (val.id == selectedText) {
        return {
          id: val.id,
          name: nameChange,
        };
      } else {
        return val;
      }
    });
    setNameChange("");
    setTextLayers(updatedTextNameLayers);
    setNameChangeSelected(!nameChangeSelected);
    console.log("double click change name");
  }

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousPos({ x: event.clientX - 20, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  function enablePointer() {
    pointerRef.current.style.display = "block";
  }
  function disablePointer() {
    pointerRef.current.style.display = "none";
  }

  // uploading an image
  function uploadImage(img) {
    setFile(URL.createObjectURL(img));
  }

  function addPointerToCertificate() {
    console.log("clicked ont the img", mousPos.x, mousPos.y);
    const x = mousPos.x;
    const y = mousPos.y;
    setPointers([...pointers, { x: x, y: y }]);
    disablePointer();
  }

  function Pointers() {
    return pointers.map((val) => (
      <div
        key={val.x + val.y}
        style={{
          top: val.y,
          left: val.x,
        }}
        className="absolute z-50 px-1 py-3 bg-red-500"
      ></div>
    ));
  }
  return (
    <div
      ref={parentPointerRef}
      className="h-screen w-screen flex overflow-hidden"
    >
      <Pointers />
      <div
        ref={pointerRef}
        style={{
          top: mousPos.y,
          left: mousPos.x,
          display: "none",
        }}
        className="absolute z-50 top-0 left-0 px-1 py-3 bg-red-500"
      ></div>
      {/* left side bar*/}
      <LeftSideBar
        enablePointer={enablePointer}
        disablePointer={disablePointer}
        file={file}
        textLayers={textLayers}
        selectedText={selectedText}
        handleLayerClick={handleLayerClick}
        handleDoubleClick={handleDoubleClick}
        delLayer={delLayer}
        nameChangeSelected={nameChangeSelected}
        setNameChange={setNameChange}
        setChangeToNameFromInput={setChangeToNameFromInput}
        addLayer={addLayer}
      />
      {/* center -certficate */}
      <div className="bg-bgGrey h-screen w-[58%] relative flex items-center justify-center">
        <div className="absolute top-0 right-0 bg-white">
          <p>
            ({mousPos.x}, {mousPos.y})
          </p>
        </div>
        <img
          onClick={addPointerToCertificate}
          src={file}
          className=" w-[90%]"
        />
      </div>
      {/* right side tools */}
      <RightSideBar upload={uploadImage} />
    </div>
  );
}

export default CertificatePage;
