import React, { useState } from "react";

const ImageSelector = (props) => {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);

  const handleMouseDown = (e) => {
    setStartX(e.nativeEvent.offsetX);
    setStartY(e.nativeEvent.offsetY);
    setEndX(e.nativeEvent.offsetX);
    setEndY(e.nativeEvent.offsetY);
  };

  const handleMouseMove = (e) => {
    if (e.buttons !== 1) return;
    setEndX(e.nativeEvent.offsetX);
    setEndY(e.nativeEvent.offsetY);
  };

  const handleMouseUp = (e) => {
    console.log(startX, startY, endX, endY);
  };
  const selectedRegionStyles = {
    position: "absolute",
    border: "2px solid grey",
    pointerEvent: "none",
    left: Math.min(startX, endX) + "px",
    top: Math.min(startY, endY) + "px",
    width: Math.abs(endX - startX) + "px",
    height: Math.abs(endY - startY) + "px",
    backgroundColor: "#808080a1",
  };
  return (
    <>
      <div style={{ position: "relative" }}>
        <img
          src={props.src}
          alt="testplan"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
        <div style={selectedRegionStyles}></div>
      </div>
    </>
  );
};

export default ImageSelector;
