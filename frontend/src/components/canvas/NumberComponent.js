import React, { useState, useEffect } from "react";
import { Stage, Layer, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../../App.css";

const NumberComponent = ({ number, x, y, width, height, colorHeight }) => {
  const [sprite_sheet] = useImage(sheet, "Anonymous");
  if (number === undefined || isNaN(number)) {
    return null;
  }
  if (number.toString().length === 2) {
    return (
      <Group>
        <Image
          image={sprite_sheet}
          x={x + 14}
          y={y}
          cropX={numberArray[number.toString().charAt(1)]}
          cropY={colorHeight}
          cropWidth={32}
          cropHeight={40}
          width={width}
          height={height}
        />
        <Image
          image={sprite_sheet}
          x={x}
          y={y}
          cropX={numberArray[number.toString().charAt(0)]}
          cropY={colorHeight}
          cropWidth={32}
          cropHeight={40}
          width={width}
          height={height}
        />
      </Group>
    );
  } else if (number.toString().length === 1) {
    return (
      <Image
        image={sprite_sheet}
        x={x}
        y={y}
        cropX={numberArray[number]}
        cropY={colorHeight}
        cropWidth={32}
        cropHeight={40}
        width={width}
        height={height}
      />
    );
  }
};

export default NumberComponent;