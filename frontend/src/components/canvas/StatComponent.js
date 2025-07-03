import React, { useState, useEffect } from "react";
import { Stage, Layer, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../../App.css";

const StatComponent = ({ text, x, y, buff, buffColor }) => {
  if (text !== undefined && text !== "") {
    if (buff) {
      if (buffColor) {
        return (
          <NumberComponent
            number={text}
            x={x}
            y={y}
            width={15}
            height={20}
            colorHeight={120}
          />
        );
      } else {
        return (
          <NumberComponent
            number={text}
            x={x}
            y={y}
            width={15}
            height={20}
            colorHeight={80}
          />
        );
      }
    } else {
      return (
        <NumberComponent
          number={text}
          x={x}
          y={y}
          width={15}
          height={20}
          colorHeight={0}
        />
      );
    }
  }
  return null;
};

export default StatComponent;