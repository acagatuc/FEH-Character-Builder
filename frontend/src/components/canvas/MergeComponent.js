import React, { useState, useEffect } from "react";
import { Stage, Layer, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../../App.css";

const MergeComponent = ({ merges }) => {
  var [imgElement] = useImage(sheet, "Anonymous");
  if (merges !== 0) {
    if (merges === 10) {
      return (
        <Group>
          <Image
            image={imgElement}
            x={122}
            y={557}
            cropX={896}
            cropY={160}
            cropWidth={32}
            cropHeight={40}
            width={15}
            height={20}
          />
          <Image
            image={imgElement}
            x={136}
            y={557}
            cropX={numberArray[1]}
            cropY={160}
            cropWidth={32}
            cropHeight={40}
            width={15}
            height={20}
          />
          <Image
            image={imgElement}
            x={149}
            y={557}
            cropX={numberArray[0]}
            cropY={160}
            cropWidth={32}
            cropHeight={40}
            width={15}
            height={20}
          />
        </Group>
      );
    }
    return (
      <Group>
        <Image
          image={imgElement}
          x={122}
          y={557}
          cropX={896}
          cropY={40}
          cropWidth={32}
          cropHeight={40}
          width={15}
          height={20}
        />
        <Image
          image={imgElement}
          x={136}
          y={557}
          cropX={numberArray[merges]}
          cropY={40}
          cropWidth={32}
          cropHeight={40}
          width={15}
          height={20}
        />
      </Group>
    );
  }
  return null;
};

export default MergeComponent;