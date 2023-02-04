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
  const [textColor, setTextColor] = useState("");

  function addLayer() {
    let layer = {
      id: Math.random(),
      name: "Text",
      val: "NAME",
      fontFamily: "poppins",
      fontWeight: "400",
      color: "#000000",
      opacity: "100",
    };
    setTextLayers([...textLayers, layer]);
  }
  function delLayer(id) {
    const newDelLayer = textLayers.filter((val) => val.id != id);
    setTextLayers(newDelLayer);
  }

  function handleLayerClick(id, val) {
    console.log("single layer click");
    setSelectedText(id);
    setTextName(val);
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
          val: val.val,
          fontFamily: val.fontFamily,
          fontWeight: val.fontWeight,
          color: val.color,
          opacity: val.opacity,
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
    setTextName(textRes);
    const updatedTextNameLayers = textLayers.map((val) => {
      if (val.id == selectedText) {
        return {
          id: val.id,
          name: val.name,
          val: textRes,
          fontFamily: val.fontFamily,
          fontWeight: val.fontWeight,
          color: val.color,
          opacity: val.opacity,
        };
      } else {
        return val;
      }
    });
    setTextLayers(updatedTextNameLayers);
  }

  function changeAttributeColor(colorRes) {
    setTextColor(colorRes);
    const updatedTextNameLayers = textLayers.map((val) => {
      if (val.id == selectedText) {
        return {
          id: val.id,
          name: val.name,
          val: val.val,
          fontFamily: val.fontFamily,
          fontWeight: val.fontWeight,
          color: colorRes,
          opacity: val.opacity,
        };
      } else {
        return val;
      }
    });
    setTextLayers(updatedTextNameLayers);
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
        setTextName={setTextName}
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
                cursor: "pointer",
                position: "absolute",
                margin: "auto",
              }}
              onClick={() => handleLayerClick(val.id, val.val)}
            >
              <h1
                style={{
                  color: val.color,
                }}
                className="text-2xl"
              >
                {val.val}
              </h1>
            </div>
          </Draggable>
        ))}
        <img
          src={file}
          className=" w-[90%]"
          onClick={() => handleLayerClick()}
        />
      </div>
      {/* right side tools */}
      <RightSideBar
        upload={uploadImage}
        changeAttributeValues={changeAttributeValues}
        textName={textName}
        changeAttributeColor={changeAttributeColor}
        textColor={textColor}
      />
    </div>
  );
}

export default CertificatePage;
