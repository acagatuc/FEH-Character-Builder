import React, { useState, useEffect } from "react";
import { Stage, Layer, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../../App.css";

const TopRowComponent = ({ move_type, count }) => {
  // add accessories to this component later
  var expBar = 0;
  var image = df;
  var cropx = 0;
  var cropy = 0;
  switch (move_type) {
    case "infantry":
      cropx = 0;
      cropy = 604;
      break;
    case "armored":
      cropx = 0;
      cropy = 302;
      break;
    case "cavalry":
      cropx = 291;
      cropy = 0;
      break;
    case "flying":
      cropx = 0;
      cropy = 0;
      break;
    default:
      image = "";
      break;
  }
  const [imgElement] = useImage(image, "Anonymous");
  const [sprite_sheet] = useImage(sheet, "Anonymous");
  if (count !== 0 && count !== "") {
    expBar = 315;
  } else {
    expBar = 205;
  }
  return (
    <Group>
      <Image
        image={sprite_sheet}
        x={5}
        y={550}
        cropWidth={268}
        cropHeight={49}
        cropX={222}
        cropY={4}
        width={201}
        height={38}
      />
      {count !== 0 && count !== "" ? (
        <Group>
          <Image
            image={sprite_sheet}
            x={205}
            y={550}
            cropWidth={146}
            cropHeight={49}
            cropX={222}
            cropY={474}
            width={110}
            height={36}
          />
          <Image
            image={imgElement}
            x={214}
            y={545}
            cropWidth={275}
            cropHeight={300}
            cropX={cropx}
            cropY={cropy}
            width={45}
            height={45}
          />
          <Text
            text={"+"}
            fontFamily="nintendoP_Skip-D_003"
            fontStyle="bold"
            fontSize={20}
            stroke="black"
            strokeWidth={4}
            lineJoin="round"
            fill={"white"}
            fillAfterStrokeEnabled={true}
            x={259}
            y={555}
            textAlign="left"
          />
          <NumberComponent
            number={count}
            x={273}
            y={558}
            width={15}
            height={20}
            colorHeight={40}
          />
        </Group>
      ) : null}
      <Image
        image={sprite_sheet}
        x={expBar}
        y={550}
        cropWidth={268}
        cropHeight={49}
        cropX={222}
        cropY={111}
        width={201}
        height={36}
      />
    </Group>
  );
};

export default TopRowComponent;