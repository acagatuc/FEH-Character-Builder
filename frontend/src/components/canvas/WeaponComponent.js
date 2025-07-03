import React, { useState, useEffect } from "react";
import { Stage, Layer, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../../App.css";

const WeaponComponent = ({ text, image, x, y, offsetX, offsetY }) => {
  if (image === "") {
    image = sheet;
  }
  const [imgElement] = useImage(image, "Anonymous");
  if (text.includes("Falchion (")) {
    text = "Falchion";
  }
  if (text === undefined) {
    return null;
  }
  if (!text.includes(undefined)) {
    return (
      <Group>
        {image === sheet ? (
          <Image
            image={imgElement}
            x={x - 4}
            y={y - 1}
            cropX={311}
            cropY={329}
            cropWidth={38}
            cropHeight={39}
            width={33}
            height={34}
          />
        ) : (
          <Image
            image={imgElement}
            x={x - 4}
            y={y - 1}
            width={33}
            height={34}
          />
        )}
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
      </Group>
    );
  }
  return (
    <Group>
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
    </Group>
  );
};

export default WeaponComponent;