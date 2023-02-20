import axios from "axios";

async function saveProjectToCloud(
  img,
  file,
  setLoading,
  setImg,
  id,
  textLayers,
  navigate,
  toast
) {
  console.log(img);
  setLoading(true);
  if (img.slice(0, 4) == "blob") {
    console.log("Image uploading to cloudinary...");
    const base64 = await convertBase64(file);
    axios
      .post(
        "https://certificate-generator-backend-node.vercel.app/uploadImage",
        { image: base64 }
      )
      .then(async (res) => {
        setImg(res.data);
        console.log("Image uploaded Succesfully. URL :", res.data);
        await addOrUpdateProject(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to save", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  } else {
    await addOrUpdateProject();
  }

  async function addOrUpdateProject(imgUrl) {
    console.log("Project : ", id);
    const token = sessionStorage.getItem("Auth Token");
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    if (id != "new") {
      // project already exits --> update
      console.log("project updating started...");
      const Projectdata = {
        user: token,
        date: today,
        projectName: id, // as id is not new it will be already exists
        img: imgUrl || img,
        layers: textLayers,
      };

      await axios
        .post(
          "https://certificate-generator-backend-node.vercel.app/update_project",
          {
            user: token,
            projectName: Projectdata.projectName,
            values: Projectdata,
          }
        )
        .then((res) => {
          console.log(res);
          setLoading(false);
          console.log("project updated sucessfully");
          toast.success("Project saved Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((err) => {
          console.log("project updating failed");
          toast.error("Failed to save", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } else {
      console.log("IMAGE IS GOING TO UPLOAD AS URL", img);
      // create project --> add
      console.log("project creation started ....");
      const Projectdata = {
        user: token,
        date: today,
        projectName: (Math.random() + 1).toString(36).substring(7),
        img: imgUrl || img,
        layers: textLayers,
      };
      await axios
        .post(
          "https://certificate-generator-backend-node.vercel.app/add_project",
          Projectdata
        )
        .then((res) => {
          console.log(res);
          setLoading(false);
          console.log("project created sucessfully");
          toast.success("Project saved Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate(`/certificate/${Projectdata.projectName}`);
        })
        .catch((err) => {
          console.log("project creation failed");
          innerRes = "failed";
          toast.error("Failed to save", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
    setLoading(false);
  }
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

export default saveProjectToCloud;
