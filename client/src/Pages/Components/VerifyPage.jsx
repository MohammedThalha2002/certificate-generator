import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import HomeNav from "./HomeNav";
import axios from "axios";

function VerifyPage() {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [img, setImg] = useState(null);
  const [certData, setCertData] = useState({
    id: "",
    date: "",
    user: "",
    cert_printed: "",
  });
  const handleChange = (img) => {
    // console.log(URL.createObjectURL(img));
    setImg(img);
    uploadCertificteToDecode(img);
  };

  async function uploadCertificteToDecode(img) {
    const data = new FormData();
    data.append("file", img);

    await axios
      .post("http://localhost:3000/image-decode", data, {
        headers: {
          "Contetnt-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("DECODED MSG : ", setCertData(res.data));
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className="h-screen w-full bg-bgGrey overflow-hidden ">
      <HomeNav title={false} />
      <div className="flex justify-evenly items-center">
        <div className="w-[60%] h-[90vh] flex flex-col justify-center items-center">
          {img ? (
            <img className="m-4 h-[60%]" src={URL.createObjectURL(img)}></img>
          ) : (
            <></>
          )}
          <FileUploader
            multiple={false}
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
        </div>
        {certData.id ? (
          <div className="w-[40%] h-[90vh] p-10">
            <div className="border-2 border-white rounded-lg p-4 h-full">
              <h1 className="text-white font-medium text-2xl underline underline-offset-3">
                DETAILS
              </h1>

              <div className="mt-10 ml-5">
                <h3 className="text-white font-medium text-lg my-3">
                  ID : <span className="">{certData.id}</span>
                </h3>
                <h3 className="text-white font-medium text-lg my-3">
                  Name : <span className="">{certData.user}</span>
                </h3>
                <h3 className="text-white font-medium text-lg my-3">
                  Printed Date : <span className="">{certData.date}</span>
                </h3>
                <h3 className="text-white font-medium text-lg my-3">
                  Printed Method :{" "}
                  <span className="">{certData.cert_printed}</span>
                </h3>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}

export default VerifyPage;
