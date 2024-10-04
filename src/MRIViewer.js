// src/MRIViewer.js
import React, { useEffect, useRef } from "react";
import cornerstone from "cornerstone-core";
import cornerstoneTools from "cornerstone-tools";

function MRIViewer({ file }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    cornerstone.enable(element);

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const arrayBuffer = e.target.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        cornerstone
          .loadImage(`dicomweb://${URL.createObjectURL(file)}`)
          .then((image) => {
            cornerstone.displayImage(element, image);
          });
      };
      reader.readAsArrayBuffer(file);
    }

    return () => {
      cornerstone.disable(element);
    };
  }, [file]);

  return (
    <div
      ref={elementRef}
      style={{ width: "512px", height: "512px", backgroundColor: "black" }}
    />
  );
}

export default MRIViewer;
