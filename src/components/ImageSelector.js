import React, { useState } from "react";
import "./ImageSelector.css";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageSelector = (props) => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [croppedImage, setCroppedImage] = useState(null);

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => setImage(reader.result));
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea);
    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = image;
    img.onload = () => {
      ctx.drawImage(
        img,
        croppedArea.x,
        croppedArea.y,
        croppedArea.width,
        croppedArea.height,
        0,
        0,
        croppedArea.width,
        croppedArea.height
      );
      console.log(img);
      setCroppedImage(canvas.toDataURL());
    };
  };

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onImageError = (e) => {
    console.log("Image error:", e);
  };
  return (
    <div className="image-selector-container">
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      {image && (
        <ReactCrop
          crop={crop}
          onChange={onCropChange}
          onComplete={onCropComplete}
          onError={onImageError}
        >
          <img alt="uploadedImg" src={image} />
        </ReactCrop>
      )}
      {croppedImage && (
        <>
          <h2 className="heading">New Image: </h2>
          <div className="cropped-image-container">
            <img
              className="cropped-img"
              src={croppedImage}
              alt="cropped"
              style={{}}
            />
            <div className="img-details">
              <div>
                Start Co-ordinates: ({crop.x},{crop.y})
              </div>
              <div>
                End Co-ordinates: ({crop.x + crop.width},{crop.y + crop.height})
              </div>
              <div>Width: {crop.width}px</div>
              <div>Height: {crop.height}px</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSelector;
