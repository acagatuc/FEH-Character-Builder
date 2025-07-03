import React, { useState, useEffect } from "react";
import { Stage, Layer, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../../App.css";

const SkillComponent = ({ text, x, y, offsetX, offsetY }) => {
  var url = "";
  if (text === "" || text.includes("undefined")) {
    url = "";
  } else {
    url = text.replace("+", "%2B");
    url = url.replace(" ", "+");
    url = url.replace("%20", "+");
    url = url.replace("/", "");
    url = "https://fehskills.s3.amazonaws.com/" + url + ".png";
  }
  const [imgElement] = useImage(url, "Anonymous");
  if (url.includes("undefined")) {
    return null;
  } else {
    if (imgElement && imgElement.width >= 75) {
      return (
        <Group>
          <Image
            image={imgElement}
            x={x - 4}
            y={y - 3}
            width={39}
            height={40}
          />
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
        <Image image={imgElement} x={x} y={y} width={33} height={34} />
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
};

export default SkillComponent;