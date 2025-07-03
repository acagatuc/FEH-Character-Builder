import React, { useState, useEffect } from "react";
import { Stage, Layer, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../../App.css";

const LargeTextComponent = ({ text, color, x, y, width }) => {
  return (
    <Text
      text={text}
      fontFamily="nintendoP_Skip-D_003"
      fontStyle="bold"
      fontSize={26}
      fill={"white"}
      stroke="black"
      strokeWidth={4}
      lineJoin="miter"
      miterLimit={1}
      fillAfterStrokeEnabled={true}
      x={x}
      y={y}
      width={width}
      height={50}
      align="center"
      verticalAlign="middle"
    />
  );
};

const TextComponent = ({ text, color, merges, x, y }) => {
  var index;
  switch (text) {
    case "HP":
      index = 0;
      break;
    case "Atk":
      index = 1;
      break;
    case "Spd":
      index = 2;
      break;
    case "Def":
      index = 3;
      break;
    case "Res":
      index = 4;
      break;
    default:
      index = -1;
  }
  if (index !== -1 && color !== undefined) {
    if (color[index] === 0 || color[index] === 1 || color[index] === 2) {
      if (color[index] === 0 && merges === 0) {
        color = "#E9A3BB";
      } else if (color[index] === 2) {
        color = "#B6E6F0";
      } else {
        color = "white";
      }
    }
  }
  return (
    <Text
      text={text}
      fontFamily="nintendoP_Skip-D_003"
      fontStyle="bold"
      fontSize={18}
      stroke="black"
      strokeWidth={4}
      lineJoin="round"
      fill={color}
      fillAfterStrokeEnabled={true}
      x={x}
      y={y}
      textAlign="left"
    />
  );
};

export default {LargeTextComponent, TextComponent};