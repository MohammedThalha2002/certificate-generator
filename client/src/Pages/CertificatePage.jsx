import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import LeftSideBar from "../Components/LeftSideBar";
import RightSideBar from "../Components/RightSideBar";
import Draggable from "react-draggable";
import axios from "axios";
import Lottie from "lottie-react";
import lottieAnimation from "../assets/animation.json";
import { ToastContainer } from "react-toastify";
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  setTextLayers,
  handleLayerClick,
  addImage,
  changeTextPos,
  setInputFocus,
} from "../hooks/reducers/certificateSlice";

function CertificatePage() {
  const [loading, setLoading] = useState(true);
  const certificateSize = useRef();
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
  const image = useSelector((state) => state.certificate.imgUrl);
  const allowedCertificate = useSelector(
    (state) => state.certificate.certificateAllowed
  );
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
          // console.log(res.data[0].img);
          dispatch(addImage({ img: res.data[0].img }));
          handleBrowserResize();
          dispatch(setTextLayers(res.data[0].layers));
          console.log(res.data[0].layers);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    if (id != "new") {
      getAlreadyCreatedCertificate();
    } else {
      handleBrowserResize();
      // Clearing all old values if present
      dispatch(setTextLayers([]));
      dispatch(addImage({ img: "" }));
      setLoading(false);
    }
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
          textPos: val.textPos,
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
    const { height, width } = certificateSize.current.getBoundingClientRect();
    setCertficateSizes({
      height: height,
      width: width,
    });
    console.log("BROWSER RESIZING ", height, width);
  }

  useEffect(() => {
    window.addEventListener("resize", handleBrowserResize);

    return () => {
      window.removeEventListener("resize", handleBrowserResize);
    };
  }, []);

  function trackPos(data, id) {
    // console.log(data.x, data.y);
    const { width, height } = certificateSize.current.getBoundingClientRect();
    console.log(width, height);
    let percentX = (data.x / width) * 100;
    let percentY = (data.y / height) * 100;
    // console.log(percentX, percentY);
    dispatch(changeTextPos([{ x: percentX, y: percentY }, id]));
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <ToastContainer />
      {/* left side bar*/}
      <LeftSideBar handleBrowserResize={handleBrowserResize} />
      {/* center -certficate */}
      <div className="bg-bgGrey h-screen w-[58%] relative flex items-center justify-center">
        <div
          className="bg-transparent flex items-center justify-center w-full mx-5"
          ref={printCertificateRef}
        >
          <div className="flex items-center justify-center relative">
            {!loading ? (
              textLayers.map((val) => (
                <Draggable
                  key={val.id}
                  bounds={{
                    left: 0,
                    right: certficateSizes.width,
                    top: 0,
                    bottom: certficateSizes.height,
                  }}
                  defaultPosition={{
                    x: (val.textPos.x * certficateSizes.width) / 100,
                    y: (val.textPos.y * certficateSizes.height) / 100,
                  }}
                  // axis="x"
                  onStop={(e, data) => trackPos(data, val.id)}
                >
                  <div
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
                    onDoubleClick={() => dispatch(setInputFocus())}
                  >
                    <h1
                      style={{
                        color: val.color,
                        fontWeight: val.fontWeight,
                        fontSize: (val.fontSize + "px").toString(),
                        fontFamily: val.fontFamily,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {val.val}
                    </h1>
                  </div>
                </Draggable>
              ))
            ) : (
              <div></div>
            )}
            <img
              ref={certificateSize}
              id="image"
              src={image}
              onClick={() => dispatch(handleLayerClick(""))}
            />
            {!allowedCertificate ? (
              <div className="flex flex-col justify-center items-center text-center">
                <Lottie animationData={lottieAnimation} loop={true} />
                <h1 className="text-white font-semibold text-2xl font-mono">
                  YOU ARE TRYING TO UPLOAD OTHER PARTY CERTIFICATE WHICH IS
                  AGAINST OUR POLICY
                </h1>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {/* right side tools */}
      <RightSideBar
        printCertificateRef={printCertificateRef}
        handleBrowserResize={handleBrowserResize}
        changeAttributeValuesForMulExports={changeAttributeValuesForMulExports}
        width={certficateSizes.width}
        height={certficateSizes.height}
      />
    </div>
  );
}

export default CertificatePage;
