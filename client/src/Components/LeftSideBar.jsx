import React, { useState, memo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import EditLayerName from "../Pages/Components/EditLayerName";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  handleLayerClick,
  handleEditPenClick,
  changeCertificateType,
  deleteLayer,
  addLayer,
  addImage,
} from "../hooks/reducers/certificateSlice";

function LeftSideBar({ handleBrowserResize }) {
  const [layerClick, setLayerClick] = useState(true);
  const [assetsClick, setAssetsClick] = useState(false);
  const [nameChangeSelected, setNameChangeSelected] = useState(false);

  const dispatch = useDispatch();
  const textLayers = useSelector((state) => state.certificate.textLayers);
  const selectedText = useSelector((state) => state.certificate.selectedText);
  const imgUrl = useSelector((state) => state.certificate.imgUrl);

  const assets = [
    "https://i.postimg.cc/Dzzvx6M3/1.png",
    "https://i.postimg.cc/mrcxc5nk/10.png",
    "https://i.postimg.cc/xjm0pct8/2.png",
    "https://i.postimg.cc/kGPdPvf4/3.png",
    "https://i.postimg.cc/K8pS82JC/4.png",
    "https://i.postimg.cc/RV9zPGWp/5.png",
    "https://i.postimg.cc/cLFZtY49/6.png",
    "https://i.postimg.cc/j57r1F6m/7.png",
    "https://i.postimg.cc/0jG1kKBC/8.png",
    "https://i.postimg.cc/k5ZmfmSW/9.png",
  ];

  function LayerClick() {
    console.log("layer click");
    setLayerClick(true);
    setAssetsClick(false);
  }

  function AssetsClick() {
    console.log("assets click");
    setLayerClick(false);
    setAssetsClick(true);
  }

  function Layers() {
    return textLayers.map((val) => (
      <div
        key={val.id}
        style={{
          backgroundColor: selectedText == val.id ? "#788C9E" : "",
        }}
        className="w-full h-[50px] pl-6 cursor-pointer
        flex justify-start items-center text-white"
      >
        <div className="w-full flex justify-start items-center">
          <FontAwesomeIcon
            icon={faPen}
            width="10px"
            className="cursor-pointer pr-6 pt-1"
            onClick={() => {
              dispatch(handleEditPenClick({ id: val.id, name: val.name }));
              setNameChangeSelected(!nameChangeSelected);
            }}
          />
          <h1
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
            className="select-none w-full text-start"
          >
            {val.name}
          </h1>
        </div>
        <FontAwesomeIcon
          icon={faTrash}
          width="10px"
          className="cursor-pointer pr-4 pt-1"
          onClick={() => dispatch(deleteLayer(val.id))}
        />
      </div>
    ));
  }

  const Assets = memo(() => {
    return (
      <div
        style={{
          overflowAnchor: "auto",
        }}
        className="w-full h-[100vh] overflow-y-scroll"
      >
        {assets.map((val) => (
          <img
            key={Math.random()}
            // style={{
            //   backgroundColor: assetSelected == val ? "#788C9E" : "",
            // }}
            onClick={() => {
              dispatch(changeCertificateType(true));
              dispatch(addImage({ img: val }));
            }}
            src={val}
            className="p-4 cursor-pointer"
          />
        ))}
      </div>
    );
  });

  return (
    <>
      <ToastContainer />
      {/* hidden layers for entering name */}
      <EditLayerName
        nameChangeSelected={nameChangeSelected}
        setNameChangeSelected={setNameChangeSelected}
      />
      {/* left bar */}
      <div
        className="bg-greyHighlight h-screen w-[20%] 
      border-stroke border-solid border-[1px]"
      >
        <div
          className="w-full h-[50px] border-stroke border-solid border-b-[1px]
        flex justify-around items-center text-white cursor-pointer"
        >
          <h1
            style={{
              fontWeight: layerClick ? "600" : "300",
            }}
            onClick={LayerClick}
          >
            Layers
          </h1>
          <h1
            style={{
              fontWeight: assetsClick ? "600" : "300",
            }}
            onClick={AssetsClick}
          >
            Assets
          </h1>
          <FontAwesomeIcon
            icon={faPlus}
            className="cursor-pointer"
            onClick={() => {
              handleBrowserResize();
              if (imgUrl) {
                dispatch(addLayer());
              } else {
                toast.error("Add an image to add Layer", {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }
            }}
          />
        </div>
        {layerClick ? <Layers /> : <Assets />}
        <div
          className="h-full"
          onClick={() => dispatch(handleLayerClick(""))}
        ></div>
      </div>
    </>
  );
}

export default LeftSideBar;
