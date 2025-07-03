import React, { useState, useEffect } from "react";
import { Stage, Layer, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../../App.css";

const UIComponent = ({ image, width, height }) => {
  const [imgElement] = useImage(ui, "Anonymous");

  return (
    <Group>
      <Image image={imgElement} x={0} y={0} width={width} height={height} />
    </Group>
  );
};
export default UIComponent;