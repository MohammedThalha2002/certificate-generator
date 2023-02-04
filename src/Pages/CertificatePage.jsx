import React, { useState, useEffect, useRef } from "react";
import LeftSideBar from "../Components/LeftSideBar";
import RightSideBar from "../Components/RightSideBar";
import Draggable from "react-draggable";

function CertificatePage() {
  const [file, setFile] = useState();
  const [mousPos, setMousPos] = useState({});
  const [selectedText, setSelectedText] = useState();
  const [nameChangeSelected, setNameChangeSelected] = useState(false);
  const [nameChange, setNameChange] = useState();
  const [textLayers, setTextLayers] = useState([]);

  // ATTRIBUTES
  const [textName, setTextName] = useState("");

  function addLayer() {
    let layer = {
      id: Math.random(),
      name: "Text",
      val: "NAME",
    };
    setTextLayers([...textLayers, layer]);
  }
  function delLayer(id) {
    const newDelLayer = textLayers.filter((val) => val.id != id);
    setTextLayers(newDelLayer);
  }

  function handleLayerClick(id) {
    console.log("single layer click");
    setSelectedText(id);
  }

  function handleEditPenClick(id, name) {
    setNameChange(name);
    setSelectedText(id);
    console.log("Edit click change", name);
    setNameChangeSelected(!nameChangeSelected);
  }

  function setChangeToNameFromInput() {
    const updatedTextNameLayers = textLayers.map((val) => {
      if (val.id == selectedText) {
        return {
          id: val.id,
          name: nameChange,
          val: val.name,
        };
      } else {
        return val;
      }
    });
    setNameChange("");
    setTextLayers(updatedTextNameLayers);
    setNameChangeSelected(!nameChangeSelected);
  }

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousPos({ x: event.clientX - 20, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // RIGHT SIDE BAR RELATED

  // uploading an image
  function uploadImage(img) {
    setFile(URL.createObjectURL(img));
  }

  function changeAttributeValues(textRes) {
    const updatedTextNameLayers = textLayers.map((val) => {
      if (val.id == selectedText) {
        return {
          id: val.id,
          name: val.name,
          val: textRes,
        };
      } else {
        return val;
      }
    });
    setTextLayers(updatedTextNameLayers);
    console.log(updatedTextNameLayers);
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* left side bar*/}
      <LeftSideBar
        // disablePointer={disablePointer}
        textLayers={textLayers}
        selectedText={selectedText}
        setSelectedText={setSelectedText}
        handleLayerClick={handleLayerClick}
        handleEditPenClick={handleEditPenClick}
        delLayer={delLayer}
        nameChangeSelected={nameChangeSelected}
        setNameChange={setNameChange}
        nameChange={nameChange}
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
        {textLayers.map((val) => (
          <Draggable key={val.id}>
            <div
              style={{
                border:
                  selectedText == val.id ? "2px solid hsl(140,40%,55%)" : "",
                padding: "4px",
              }}
            >
              <h1 className="text-2xl">{val.val}</h1>
            </div>
          </Draggable>
        ))}
        <img src={file} className=" w-[90%]" />
      </div>
      {/* right side tools */}
      <RightSideBar
        upload={uploadImage}
        changeAttributeValues={changeAttributeValues}
        setTextName={setTextName}
        textName={textName}
      />
    </div>
  );
}

export default CertificatePage;
