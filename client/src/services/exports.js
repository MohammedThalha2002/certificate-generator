import {
  exportComponentAsPNG,
  exportComponentAsJPEG,
} from "react-component-export-image";
import axios from "axios";
import { saveAs } from "file-saver";

export async function exportToPNG(printCertificateRef, name) {
  exportComponentAsPNG(printCertificateRef, {
    fileName: name || "certificate",
    html2CanvasOptions: {
      backgroundColor: "transparent",
    },
  });
}

export async function exportToJPG(height, width, image, textLayers) {
  const data = {
    height: height,
    width: width,
    image: image,
    layers: textLayers,
  };
  console.log(data);
  await axios
    .post("http://localhost:3000/export-png", data)
    .then((res) =>
      axios.get("http://localhost:3000/get-file", { responseType: "blob" })
    )
    .then((res) => {
      const imgBlob = new Blob([res.data], { type: "application/image" });
      saveAs(imgBlob, "certificate.png");
    })
    .catch((err) => {
      console.log("Failed to export Image", err);
    });
}
