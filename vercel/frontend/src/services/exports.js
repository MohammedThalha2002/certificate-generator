import {
  exportComponentAsPNG,
  exportComponentAsJPEG,
} from "react-component-export-image";

export function exportToPNG(printCertificateRef, name) {
  exportComponentAsPNG(printCertificateRef, {
    fileName: name || "certificate",
    html2CanvasOptions: {
      backgroundColor: "transparent",
    },
  });
}

export function exportToJPG(printCertificateRef) {
  exportComponentAsJPEG(printCertificateRef, {
    fileName: "certificate",
    html2CanvasOptions: {
      backgroundColor: "transparent",
    },
  });
}
