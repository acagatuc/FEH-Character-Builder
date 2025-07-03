import React, { useState, useEffect } from "react";
import { Stage, Layer, Group, Image, Text } from "react-konva";
import useImage from "use-image";
import "./HeroCanvas.css";
import "./../../App.css";


const WMComponent = ({ weapon, movement }) => {
  // i think something in this method is adding shadows to the ui left of lv.
  // replace all of this for weapon types from the sprite sheet
  const [imgElement] = useImage(wmsheet, "Anonymous");
  var weaponX = 0;
  var weaponY = 0;
  var moveX = 0;

  if (weapon !== undefined) {
    weapon = weapon.split(" ");
  } else {
    weapon = ["", ""];
  }

  switch (weapon[0]) {
    case "Red":
      weaponX = 0;
      break;
    case "Blue":
      weaponX = 72;
      break;
    case "Green":
      weaponX = 141;
      break;
    case "Gray":
      weaponX = 213;
      break;
    case "":
      weaponX = -72;
      break;
    default:
      break;
  }
  switch (weapon[1]) {
    case "Tome":
      weaponY = 73;
      break;
    case "Bow":
      weaponY = 146;
      break;
    case "Dragon":
      weaponY = 219;
      break;
    case "Dagger":
      weaponY = 292;
      break;
    case "Staff":
      weaponY = 370;
      break;
    case "Beast":
      weaponY = 438;
      break;
    case "":
      weaponY = -73;
      break;
    default:
      weaponY = 0;
      break;
  }

  switch (movement) {
    case "infantry":
      moveX = 1;
      break;
    case "armored":
      moveX = 53;
      break;
    case "cavalry":
      moveX = 105;
      break;
    case "flying":
      moveX = 157;
      break;
    default:
      moveX = -50;
      break;
  }

  return (
    <Group>
      <Image
        image={imgElement}
        x={13}
        y={554}
        cropX={weaponX}
        cropY={weaponY}
        cropWidth={75}
        cropHeight={72}
        width={27}
        height={27}
      />
      <Image
        image={imgElement}
        x={170}
        y={555}
        cropX={moveX}
        cropY={525}
        cropWidth={50}
        cropHeight={50}
        width={27}
        height={27}
      />
    </Group>
  );
};

export default WMComponent;