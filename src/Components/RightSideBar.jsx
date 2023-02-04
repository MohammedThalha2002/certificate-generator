import React, { useRef } from "react";

function RightSideBar({
  upload,
  changeAttributeValues,
  setTextName,
  textName,
}) {
  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    upload(fileUploaded);
  };

  return (
    <>
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
            onChange={(e) => {
              setTextName(e.target.value);
              changeAttributeValues(e.target.value);
            }}
            className="bg-transparent w-[100%] py-1 px-1
             border-stroke border-solid border-[1px]"
          />
          <select
            id="fonts"
            className="bg-transparent w-[100%] py-1 px-1 mt-8 dark:bg-greyHighlight dark:border-solid
               dark:border-stroke dark:border-[1px] dark:text-white"
          >
            <option value="US">Poppins</option>
            <option value="CA">Arial</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
          <div className="flex justify-between items-center">
            <select
              id="fonts"
              className="bg-transparent w-[45%] py-1 px-1 mt-8 dark:bg-greyHighlight dark:border-solid
               dark:border-stroke dark:border-[1px] dark:text-white"
            >
              <option value="CA">Light</option>
              <option value="CA">Regular</option>
              <option value="FR">Medium</option>
              <option value="DE">Bold</option>
            </select>
            <select
              id="font-size"
              className="bg-transparent w-[45%] py-1 px-1 mt-8 dark:bg-greyHighlight dark:border-solid
               dark:border-stroke dark:border-[1px] dark:text-white"
            >
              <option value="CA">10px</option>
              <option value="CA">20px</option>
              <option value="FR">30px</option>
              <option value="DE">40px</option>
              <option value="DE">50px</option>
              <option value="DE">60px</option>
              <option value="DE">70px</option>
            </select>
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
              <h1>#FFFFF</h1>
              <input type="color" width="10px" height="10px" />
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
      </div>
    </>
  );
}

export default RightSideBar;
