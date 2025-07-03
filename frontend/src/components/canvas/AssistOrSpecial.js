import React, { useState, useEffect } from "react";
import { Stage, Layer, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../../App.css";

const AssistOrSpecial = ({ text, x, y, offsetX, offsetY }) => {
  if (text === undefined) {
    return null;
  }
  return (
    <Text
      text={text}
      fontFamily="nintendoP_Skip-D_003"
      fontSize={18}
      stroke="black"
      strokeWidth={4}
      lineJoin="round"
      fill="white"
      fillAfterStrokeEnabled={true}
      x={x + offsetX}
      y={y + offsetY}
      textAlign="left"
    />
  );
};

export default AssistOrSpecial;