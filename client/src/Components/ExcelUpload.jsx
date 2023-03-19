import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { read, utils } from "xlsx";
import { exportToPNG } from "../services/exports";

function ExcelUpload({
  setMultiExport,
  printCertificateRef,
  changeAttributeValuesForMulExports,
}) {
  const hiddenFileInput = useRef(null);

  const [jsonData, setJsonData] = useState([]);
  const [headings, setHeadings] = useState([]);

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = utils.sheet_to_json(worksheet);
        console.log(json);
        console.log(Object.keys(json[0]));
        setJsonData(json);
        setHeadings(Object.keys(json[0]));
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  async function generateMultipleExports() {
    for (const data of jsonData) {
      let name = data.Name;
      console.log(name);
      for (const head of headings) {
        await changeAttributeValuesForMulExports(data[head], head);
      }
      console.log(".................");
      console.log("PRINT CERTIFICATE");
      console.log(".................");
      await exportToPNG(printCertificateRef);
    }
  }

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <div
      className="h-[80vh] w-[80vw] bg-white rounded-md 
  absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]"
    >
      <FontAwesomeIcon
        icon={faClose}
        width="10px"
        color="white"
        className="cursor-pointer ml-4 mt-4 p-2 px-3 rounded-full bg-bgGrey"
        onClick={() => setMultiExport(false)}
      />
      <div className="flex flex-col text-center justify-center items-center">
        {jsonData.length !== 0 ? (
          <></>
        ) : (
          <div
            className="w-full relative h-[50px]
         px-8 items-center justify-center text-white"
          >
            <div>
              <button
                onClick={handleClick}
                className="bg-bgGrey text-white px-6 py-1 rounded-md my-6 "
              >
                Upload
              </button>
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={readUploadFile}
                style={{ display: "none" }}
              />
            </div>
          </div>
        )}

        <div className="excel-scroll w-[90%] h-[60vh] overflow-y-scroll">
          <table className=" w-[96%] mx-4 border-2 border-solid border-bgGrey">
            <tr>
              {headings.map((val, key) => (
                <th key={key} className="border-b-2 border-solid border-black">
                  {val}
                </th>
              ))}
            </tr>
            {jsonData.map((data, key) => {
              return (
                <tr key={key}>
                  {headings.map((head, key) => (
                    <td
                      key={key}
                      className="text-center border-b-[1px] border-solid border-black"
                    >
                      {data[head]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </table>
        </div>
        {jsonData.length === 0 ? (
          <></>
        ) : (
          <button
            onClick={generateMultipleExports}
            className="bg-bgGrey text-white px-6 py-1 rounded-md my-6 "
          >
            GENERATE
          </button>
        )}
      </div>
    </div>
  );
}

export default ExcelUpload;
