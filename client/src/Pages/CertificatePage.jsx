import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import LeftSideBar from "../Components/LeftSideBar";
import RightSideBar from "../Components/RightSideBar";
import Draggable from "react-draggable";
import axios from "axios";
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  setTextLayers,
  handleLayerClick,
  addImage,
} from "../hooks/reducers/certificateSlice";

function CertificatePage() {
  const certificateSize = useRef();
  const textRef = useRef();
  const [certficateSizes, setCertficateSizes] = useState({
    height: 0,
    width: 0,
  });
  const [initalPos, setInitialPos] = useState({
    x: 10,
  });

  // PRINTING
  const printCertificateRef = useRef();

  // PROJECT ID
  const { id } = useParams();

  // redux
  const textLayers = useSelector((state) => state.certificate.textLayers);
  const selectedText = useSelector((state) => state.certificate.selectedText);
  const image = useSelector((state) => state.certificate.imgUrl);
  const textWidth = useSelector((state) => state.certificate.textWidth);
  const dispatch = useDispatch();

  // GETTING DATA IF PROJECT IS ALREADY CREATED
  async function getAlreadyCreatedCertificate() {
    const projectName = id;
    if (projectName) {
      await axios
        .post("http://localhost:3000/get_project_by_id", {
          projectName: projectName,
        })
        .then((res) => {
          console.log(res.data[0].img);
          dispatch(setTextLayers(res.data[0].layers));
          dispatch(addImage(res.data[0].img));
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    if (id != "new") getAlreadyCreatedCertificate();
  }, []);

  // change attribute value for multiple exports
  let newTextLayer = textLayers;
  function changeAttributeValuesForMulExports(textValue, key) {
    // setTextName(textValue);
    let modify = newTextLayer.map((val) => {
      if (val.name === key) {
        return {
          id: val.id,
          name: val.name,
          val: textValue,
          fontFamily: val.fontFamily,
          fontWeight: val.fontWeight,
          fontSize: val.fontSize,
          color: val.color,
          opacity: val.opacity,
        };
      } else {
        return val;
      }
    });
    console.log(modify);
    newTextLayer = modify;
    dispatch(setTextLayers(modify));
  }

  function handleBrowserResize() {
    // console.log(certificateSize.current.getBoundingClientRect());
    const { height, width } = certificateSize.current.getBoundingClientRect();
    setCertficateSizes({
      height: height,
      width: width,
    });
    let percent = sessionStorage.getItem("percent");
    let pos = percent != null ? (percent * width - 100) / 100 : 0;
    console.log(percent, pos);
    setInitialPos({ x: pos - 35, y: 0 });
  }

  useEffect(() => {
    handleBrowserResize();
    window.addEventListener("resize", handleBrowserResize);

    return () => {
      window.removeEventListener("resize", handleBrowserResize);
    };
  }, []);

  function trackPos(data) {
    console.log(data.x, data.y);
    const { width } = certificateSize.current.getBoundingClientRect();
    console.log("setting position");
    let percent = (data.x / (width - 100)) * 100;
    sessionStorage.setItem("percent", percent);
    // let pos = (percent * certficateSizes.width - 100) / 100;
    // console.log(pos, percent);
    // setInitialPos({ x: pos - 35 });
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* left side bar*/}
      <LeftSideBar />
      {/* center -certficate */}
      <div className="bg-bgGrey h-screen w-[58%] relative flex items-center justify-center">
        <div
          className="bg-transparent flex items-center justify-center w-full"
          ref={printCertificateRef}
        >
          <div className="w-[95%] relative">
            {textLayers.map((val) => (
              <Draggable
                key={val.id}
                bounds={{
                  left: 0,
                  right: certficateSizes.width,
                  top: 0,
                  bottom: certficateSizes.height - 48,
                }}
                defaultPosition={{
                  x: initalPos.x,
                  y: 224,
                }}
                // axis="x"

                onStop={(e, data) => trackPos(data)}
              >
                <div
                  ref={textRef}
                  style={{
                    border: selectedText == val.id ? "2px solid #7aff95" : "",
                    padding: "4px",
                    cursor: "pointer",
                    position: "absolute",
                    top: "0",
                    left: "0",
                  }}
                  onClick={() =>
                    dispatch(
                      handleLayerClick({
                        id: val.id,
                        val: val.val,
                        color: val.color,
                        fontWeight: val.fontWeight,
                        fontSize: val.fontSize,
                        fontFamily: val.fontFamily,
                      })
                    )
                  }
                >
                  <h1
                    style={{
                      color: val.color,
                      fontWeight: val.fontWeight,
                      fontSize: val.fontSize + "px",
                      fontFamily: val.fontFamily,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {val.val}
                  </h1>
                </div>
              </Draggable>
            ))}
            <img
              ref={certificateSize}
              src={image}
              className="w-full"
              onClick={() => dispatch(handleLayerClick(""))}
            />
          </div>
        </div>
      </div>
      {/* right side tools */}
      <RightSideBar
        printCertificateRef={printCertificateRef}
        changeAttributeValuesForMulExports={changeAttributeValuesForMulExports}
      />
    </div>
  );
}

export default CertificatePage;
