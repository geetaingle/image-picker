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
    console.log(startX, startY, endX, endY);
  };

  const handleMouseMove = (e) => {
    if (e.buttons !== 1) return;
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
    if (mouseX < startX && mouseY < startY) {
      setStartX(mouseX);
      setStartY(mouseY);
    } else if (mouseX > endX && mouseY < startY) {
      setEndX(mouseX);
      setStartY(mouseY);
    } else if (mouseX < startX && mouseY > endY) {
      setStartX(mouseX);
      setEndY(mouseY);
    } else if (mouseX > endX && mouseY > endY) {
      setEndX(mouseX);
      setEndY(mouseY);
    } else if (mouseX < startX) {
      setStartX(mouseX);
    } else if (mouseX > endX) {
      setEndX(mouseX);
    } else if (mouseY < startY) {
      setStartY(mouseY);
    } else if (mouseY > endY) {
      setEndY(mouseY);
    }
    console.log(startX, startY, endX, endY);
  };

  const handleMouseUp = (e) => {
    console.log("up");
  };

  const selectedRegionStyles = {
    position: "absolute",
    border: "2px solid grey",
    pointerEvent: "none",
    width: "10px",
    height: "10px",
    right: "-6px",
    bottom: "-6px",
    left: Math.min(startX, endX) + "px",
    top: Math.min(startY, endY) + "px",
    width: Math.abs(endX - startX) + "px",
    height: Math.abs(endY - startY) + "px",
    backgroundColor: "rgba(128, 128, 128, 30%)",
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
        <div style={{ ...selectedRegionStyles, cursor: "nwse-resize" }} />
      </div>
    </>
  );
};

export default ImageSelector;
