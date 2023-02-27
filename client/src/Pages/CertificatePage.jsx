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
} from "../hooks/reducers/certificateSlice";

function CertificatePage() {
  const certificateSize = useRef();
  const [file, setFile] = useState();
  const [certficateSizes, setCertficateSizes] = useState({
    height: 0,
    width: 0,
  });

  // PRINTING
  const printCertificateRef = useRef();

  // PROJECT ID
  const { id } = useParams();

  // redux
  const textLayers = useSelector((state) => state.certificate.textLayers);
  const selectedText = useSelector((state) => state.certificate.selectedText);
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
          setFile(res.data[0].img);
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    if (id != "new") getAlreadyCreatedCertificate();
  }, []);

  function handleBrowserResize() {
    console.log(certificateSize.current.getBoundingClientRect());
    setCertficateSizes({
      height: certificateSize.current.offsetWidth,
      width: certificateSize.current.offsetHeight,
    });
  }

  useEffect(() => {
    handleBrowserResize();
    window.addEventListener("resize", handleBrowserResize);

    return () => {
      window.removeEventListener("resize", handleBrowserResize);
    };
  }, []);

  // Upload assets image
  function uploadAssetImage(img) {
    setFile(img);
  }

  // RIGHT SIDE BAR RELATED ==> for uploading local image
  // uploading an image
  function uploadImage(img) {
    setFile(URL.createObjectURL(img));
  }

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

  function trackPos(data) {
    // console.log(data.x, data.y);
    // console.log(
    //   certificateSize.current.offsetWidth,
    //   certificateSize.current.offsetHeight
    // );
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* left side bar*/}
      <LeftSideBar uploadAssetImage={uploadAssetImage} />
      {/* center -certficate */}
      <div
        ref={certificateSize}
        className="bg-bgGrey h-screen w-[58%] relative flex items-center justify-center"
      >
        <div
          className="bg-transparent flex items-center justify-center w-full"
          ref={printCertificateRef}
        >
          {textLayers.map((val) => (
            <Draggable
              key={val.id}
              bounds={{
                left: -(certficateSizes.width * 0.5) + 50,
                right: certficateSizes.width * 0.5 - 50,
                top: -(certficateSizes.height * 0.5) + 30,
                bottom: certficateSizes.height * 0.5 - 30,
              }}
              defaultPosition={{
                x: 0,
                y: 0,
              }}
              onDrag={(e, data) => trackPos(data)}
            >
              <div
                style={{
                  border: selectedText == val.id ? "2px solid #7aff95" : "",
                  padding: "4px",
                  cursor: "pointer",
                  position: "absolute",
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
            src={file}
            className="w-[95%]"
            onClick={() => dispatch(handleLayerClick(""))}
          />
        </div>
      </div>
      {/* right side tools */}
      <RightSideBar
        imgFromAssets={file}
        upload={uploadImage}
        printCertificateRef={printCertificateRef}
        changeAttributeValuesForMulExports={changeAttributeValuesForMulExports}
      />
    </div>
  );
}

export default CertificatePage;
