import React, { useState, useEffect } from "react";
import { Stage, Layer, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../../App.css";

const BackgroundComponent = ({ image, summonerSupport, width, height }) => {
  if (image.label === "" || image === "" || image === undefined) {
    image = "normal";
  } else {
    image = image.value;
  }
  if (
    summonerSupport !== "No" &&
    summonerSupport !== null &&
    summonerSupport !== ""
  ) {
    image += "_summoner";
  }
  var url = "https://fehportraits.s3.amazonaws.com/bg_" + image + ".png";
  const [imgElement] = useImage(url, "Anonymous");

  return (
    <Image
      image={imgElement}
      x={0}
      y={0}
      cropX={130}
      cropY={0}
      cropWidth={540}
      cropHeight={900}
      width={width}
      height={height}
    />
  );
};

export default BackgroundComponent;