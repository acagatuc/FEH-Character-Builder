import React, { useState, useEffect } from "react";
import { Stage, Layer, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../../App.css";

const ButtonsComponent = ({ duo, fav }) => {
  // if duo/harmonic, contains convo button, else does not
  const [imgElement] = useImage(sheet, "Anonymous");
  const [bgButton] = useImage(bg_button, "Anonymous");

  var x = 98;
  var y = 112;

  if (fav % 2 !== 0 && fav !== 0) {
    x = 2;
  }

  switch (fav) {
    case 1:
    case 2:
      y = 208;
      break;
    case 3:
    case 4:
      y = 304;
      break;
    case 5:
    case 6:
      y = 400;
      break;
    case 7:
    case 8:
      y = 496;
      break;
    default:
      break;
  }
  return (
    <Group>
      <Image
        image={imgElement}
        x={-5}
        y={8}
        width={80}
        height={80}
        cropX={0}
        cropY={0}
        cropWidth={107}
        cropHeight={108}
      />
      <Image
        image={imgElement}
        x={1}
        y={90}
        width={70}
        height={70}
        cropX={0}
        cropY={110}
        cropWidth={92}
        cropHeight={95}
      />
      <Image
        image={imgElement}
        x={1}
        y={160}
        width={70}
        height={71}
        cropX={x}
        cropY={y}
        cropWidth={92}
        cropHeight={95}
      />
      <Image
        image={bgButton}
        x={0}
        y={229}
        width={71}
        height={71}
        cropX={0}
        cropY={0}
        cropWidth={144}
        cropHeight={146}
      />
      {duo ? (
        <Image
          image={imgElement}
          x={1}
          y={301}
          width={69}
          height={70}
          cropX={0}
          cropY={592}
          cropWidth={92}
          cropHeight={95}
        />
      ) : null}
      <Image
        image={imgElement}
        x={367}
        y={15}
        width={165}
        height={35}
        cropX={219}
        cropY={162}
        cropWidth={222}
        cropHeight={47}
      />
    </Group>
  );
};

export default ButtonsComponent;