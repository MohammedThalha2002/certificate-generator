import React, { useEffect, useState, useRef } from "react";
import ExcelUpload from "./ExcelUpload";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import saveProjectToCloud from "../services/saveProject";
import { exportToJPG, exportToPNG } from "../services/exports";
import { toast } from "react-toastify";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import ml5 from "ml5";
import {
  changeTextValue,
  changeFontColor,
  changeFontFamily,
  changeFontSize,
  changeFontWeight,
  addImage,
  changeCertificateType,
} from "../hooks/reducers/certificateSlice";

function RightSideBar({
  printCertificateRef,
  changeAttributeValuesForMulExports,
  handleBrowserResize,
  height,
  width,
}) {
  const hiddenFileInput = useRef(null);
  const inputValueRef = useRef();
  const [img, setImg] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [multiExport, setMultiExport] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const textLayers = useSelector((state) => state.certificate.textLayers);
  const selectedText = useSelector((state) => state.certificate.selectedText);
  const textValue = useSelector((state) => state.certificate.textValue);
  const textColor = useSelector((state) => state.certificate.textColor);
  const fontSize = useSelector((state) => state.certificate.fontSize);
  const fontWeight = useSelector((state) => state.certificate.fontWeight);
  const fontFamily = useSelector((state) => state.certificate.fontFamily);
  const imgFromAssets = useSelector((state) => state.certificate.imgUrl);
  const inputFocus = useSelector((state) => state.certificate.inputFocus);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(imgFromAssets);
    setImg(imgFromAssets);
  }, [imgFromAssets]);

  useEffect(() => {
    const classifier = ml5.imageClassifier(
      "https://teachablemachine.withgoogle.com/models/yWO4ObRNp/model.json",
      (e) => {
        console.log("ML file loaded");
      }
    );
    if (file) {
      dispatch(changeCertificateType(true));
      try {
        classifier.classify(
          document.getElementById("image"),
          (err, results) => {
            console.log(results);
            const val = results[0].label;
            if (val !== "normal") {
              dispatch(changeCertificateType(false));
              setFile("");
              dispatch(addImage({ img: "" }));
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }, [file]);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setFile(fileUploaded);
    const imgUrl = URL.createObjectURL(fileUploaded);
    dispatch(addImage({ img: imgUrl }));
    handleBrowserResize();
  };

  function handleMultipleExports() {
    console.log("multiple upload");
    setMultiExport(true);
  }

  useEffect(() => {
    inputValueRef.current.focus();
  }, [inputFocus]);

  return (
    <>
      {multiExport ? (
        <ExcelUpload
          setMultiExport={setMultiExport}
          printCertificateRef={printCertificateRef}
          changeAttributeValuesForMulExports={
            changeAttributeValuesForMulExports
          }
        />
      ) : (
        <div></div>
      )}
      <div
        className="bg-greyHighlight h-screen w-[22%] 
      border-stroke border-solid border-[1px]"
      >
        {/* TOP designs and upload btn */}
        <div
          className="w-full relative h-[50px] border-stroke border-solid border-b-[1px]
        flex justify-between px-8 items-center text-white"
        >
          <h1>Design</h1>
          <button
            onClick={handleClick}
            className="bg-white text-black px-6 py-1 rounded-md my-6 "
          >
            Upload
          </button>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: "none" }}
          />
          <FontAwesomeIcon
            icon={loading ? faSpinner : faCloudArrowUp}
            width="20px"
            className="cursor-pointer ml-4"
            onClick={async () => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 5000);
              await saveProjectToCloud(
                img,
                file,
                setLoading,
                setImg,
                id,
                textLayers,
                navigate,
                toast
              );
            }}
          />
        </div>
        {/* TEXT PROPERTIES */}
        <div
          className="w-full h-[250px] border-stroke border-solid border-b-[1px]
        flex-col justify-between px-8 py-4 items-center text-white"
        >
          <h1 className="pb-2">Text</h1>
          <input
            ref={inputValueRef}
            type="text"
            value={textValue}
            onChange={(e) => dispatch(changeTextValue(e.target.value))}
            className="bg-transparent w-[100%] py-1 px-1
             border-stroke border-solid border-[1px]"
          />
          <select
            value={fontFamily}
            onChange={(e) => dispatch(changeFontFamily(e.target.value))}
            className="bg-transparent w-[100%] py-1 px-1 mt-8 dark:bg-greyHighlight dark:border-solid
               dark:border-stroke dark:border-[1px] dark:text-white"
          >
            <option defaultChecked></option>
            <option value="Poppins">Poppins</option>
            <option value="Raleway">Raleway</option>
            <option value="Sassy Frass">Sassy Frass</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Itim">Itim</option>
            <option value="Solitreo">Solitreo</option>
            <option value="Roboto">Roboto</option>
            <option value="Source Sans Pro">Sans Pro</option>
            <option value="Quicksand">Quicksand</option>
            <option value="Dancing Script">Dancing Script</option>
          </select>
          <div className="flex justify-between items-center">
            {/* FONT WEIGHT */}
            <select
              value={fontWeight}
              onChange={(e) => dispatch(changeFontWeight(e.target.value))}
              className="bg-transparent w-[45%] py-1 px-1 mt-8 dark:bg-greyHighlight dark:border-solid
               dark:border-stroke dark:border-[1px] dark:text-white"
            >
              <option defaultChecked></option>
              <option value="300">Light</option>
              <option value="400">Regular</option>
              <option value="500">Medium</option>
              <option value="600">Semi-Bold</option>
              <option value="800">Bold</option>
            </select>
            {/* FONT SIZE */}
            <input
              type="number"
              value={fontSize}
              onChange={(e) => dispatch(changeFontSize(e.target.value))}
              className="bg-transparent w-[45%] py-1 px-1 mt-8
             border-stroke border-solid border-[1px]"
            />
          </div>
        </div>
        {/* FILL PROPERTIES */}
        <div
          className="w-full h-[150px] border-stroke border-solid border-b-[1px]
        flex-col justify-between px-8 py-4 items-center text-white"
        >
          <h1 className="pb-2">Fill</h1>
          <div className="flex justify-between items-center">
            <div className="bg-transparent h-9 w-[55%] flex justify-between py-1 px-2 mt-8 border-stroke border-solid border-[1px]">
              <h1>{textColor}</h1>
              <input
                type="color"
                value={textColor}
                width="10px"
                height="10px"
                disabled={selectedText ? "" : "disabled"}
                onChange={(e) => dispatch(changeFontColor(e.target.value))}
              />
            </div>
            <select
              id="font-size"
              className="bg-transparent w-[35%] py-1 px-1 mt-8 dark:bg-greyHighlight dark:border-solid
               dark:border-stroke dark:border-[1px] dark:text-white"
            >
              <option value="CA">10%</option>
              <option value="CA">20%</option>
              <option value="FR">30%</option>
              <option value="DE">40%</option>
              <option value="DE">50%</option>
              <option value="DE">60%</option>
              <option value="DE">70%</option>
              <option value="DE">100%</option>
            </select>
          </div>
        </div>
        <div
          className="w-full h-[250px] border-stroke border-solid border-b-[1px]
        flex flex-col justify-start px-8 py-4 items-start text-white"
        >
          <h1 className="pb-2">Exports</h1>

          <button
            className="text-black my-2 bg-white p-2 rounded-md"
            onClick={() => {
              exportToJPG(height, width, imgFromAssets, textLayers, toast);
            }}
          >
            Export As JPEG
          </button>
          <button
            className="text-black my-2 bg-white p-2 rounded-md"
            onClick={() => {
              exportToPNG(printCertificateRef);
            }}
          >
            Export As PNG
          </button>
          <button
            onClick={handleMultipleExports}
            className="text-black my-2 bg-white p-2 rounded-md"
          >
            Multiple Exports
          </button>
        </div>
      </div>
    </>
  );
}

export default RightSideBar;
