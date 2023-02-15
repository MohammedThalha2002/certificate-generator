import React, { useState } from "react";
import ExcelUpload from "./ExcelUpload";
import { exportComponentAsPNG } from "react-component-export-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faDownload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function RightSideBar({
  alreadyUploadedImg,
  upload,
  textLayers,
  changeAttributeValues,
  textName,
  changeAttributeColor,
  textColor,
  selectedText,
  changeAttributeFontWeight,
  fontWeight,
  changeAttributeFontSize,
  fontSize,
  changeAttributeFontFamily,
  fontFamily,
  printCertificateRef,
  changeAttributeValuesForMulExports,
}) {
  const hiddenFileInput = React.useRef(null);
  const [img, setImg] = useState("");
  const [imgAlreadyUploaded, setImgAlreadyUploaded] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [multiExport, setMultiExport] = useState(false);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    // new file was uploaded so use the file
    if (img !== fileUploaded) {
      setImgAlreadyUploaded(false);
    }
    setImg(fileUploaded);
    // setImg(URL.createObjectURL(fileUploaded));
    upload(fileUploaded);
  };

  function handleMultipleExports() {
    console.log("multiple upload");
    setMultiExport(true);
  }

  function exportToPNG(name) {
    exportComponentAsPNG(printCertificateRef, {
      fileName: name || "certificate",
      html2CanvasOptions: {
        backgroundColor: "transparent",
      },
    });
  }

  function exportToJPG() {
    exportComponentAsPNG(printCertificateRef, {
      fileName: "certificate",
      html2CanvasOptions: {
        backgroundColor: "transparent",
      },
    });
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function saveProjectToCloud() {
    setLoading(true);
    const projectName = sessionStorage.getItem("projectName");
    if (img && !imgAlreadyUploaded && !projectName) {
      const base64 = await convertBase64(img);
      axios
        .post("http://localhost:3000/uploadImage", { image: base64 })
        .then((res) => {
          setUrl(res.data);
          console.log("Image uploaded Succesfully");
          setImgAlreadyUploaded(true);
          addOrUpdateProject();
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    } else {
      addOrUpdateProject();
    }

    async function addOrUpdateProject() {
      const token = sessionStorage.getItem("Auth Token");
      const projectName = sessionStorage.getItem("projectName");
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();

      today = mm + "/" + dd + "/" + yyyy;

      if (projectName) {
        // project already exits --> update
        console.log("project updating started");
        const Projectdata = {
          user: token,
          date: today,
          projectName: projectName,
          img: url || alreadyUploadedImg,
          layers: textLayers,
        };

        await axios
          .post("http://localhost:3000/update_project", {
            user: token,
            projectName: Projectdata.projectName,
            values: Projectdata,
          })
          .then((res) => {
            console.log(res);
            setLoading(false);
            console.log("project updated");
          })
          .catch((err) => {
            console.log("project updating failed");
          });
      } else {
        // create project --> add
        console.log("project creating ....");
        const Projectdata = {
          user: token,
          date: today,
          projectName: (Math.random() + 1).toString(36).substring(7),
          img: url,
          layers: textLayers,
        };
        await axios
          .post("http://localhost:3000/add_project", Projectdata)
          .then((res) => {
            sessionStorage.setItem("projectName", Projectdata.projectName);
            console.log(res);
            setLoading(false);
            console.log("project created sucessfully");
          })
          .catch((err) => {
            console.log("project creation failed");
          });
      }
      setLoading(false);
    }
  }

  return (
    <>
      {multiExport ? (
        <ExcelUpload
          setMultiExport={setMultiExport}
          exportToJPG={exportToJPG}
          exportToPNG={exportToPNG}
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
            icon={loading ? faDownload : faCloudArrowUp}
            width="20px"
            className="cursor-pointer pr-4 pt-1"
            onClick={saveProjectToCloud}
          />
        </div>
        {/* TEXT PROPERTIES */}
        <div
          className="w-full h-[250px] border-stroke border-solid border-b-[1px]
        flex-col justify-between px-8 py-4 items-center text-white"
        >
          <h1 className="pb-2">Text</h1>
          <input
            type="text"
            value={textName}
            onChange={(e) => changeAttributeValues(e.target.value)}
            className="bg-transparent w-[100%] py-1 px-1
             border-stroke border-solid border-[1px]"
          />
          <select
            value={fontFamily}
            onChange={(e) => changeAttributeFontFamily(e.target.value)}
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
              onChange={(e) => changeAttributeFontWeight(e.target.value)}
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
              onChange={(e) => changeAttributeFontSize(e.target.value)}
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
                onChange={(e) => changeAttributeColor(e.target.value)}
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
            onClick={exportToJPG}
          >
            Export As JPEG
          </button>
          <button
            className="text-black my-2 bg-white p-2 rounded-md"
            onClick={exportToPNG}
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
