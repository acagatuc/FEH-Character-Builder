import { Group, Image } from "react-konva";
import useImage from "use-image";
import wmsheet from "./../../assets/wmsheet.png";

export const weaponMap = {
  "Sword": [0, 0],
  "Lance": [72, 0],
  "Axe": [141, 0],
  "Red Tome": [0, 73],
  "Blue Tome": [72, 73],
  "Green Tome": [141, 73],
  "Colorless Tome": [213, 73],
  "Red bow": [0, 146],
  "Blue bow": [72, 146],
  "Green bow": [141, 146],
  "Colorless bow": [213, 146],
  "Red Breath": [0, 219],
  "Blue Breath": [72, 219],
  "Green Breath": [141, 219],
  "Colorless Breath": [213, 219],
  "Red Dagger": [0, 292],
  "Blue Dagger": [72, 292],
  "Green Dagger": [141, 292],
  "Colorless Dagger": [213, 292],
  "Staff": [213, 370],
  "Red Beast": [0, 438],
  "Blue Beast": [72, 438],
  "Green Beast": [141, 438],
  "Colorless Beast": [213, 438],
  "empty": [-72, -73]
}

export const moveMap = {
  "Infantry": 1,
  "Armored": 53,
  "Cavalry": 105,
  "Flying": 157,
  "empty": -50
}


const WMComponent = ({ weapon, movement }) => {
  // i think something in this method is adding shadows to the ui left of lv.
  // replace all of this for weapon types from the sprite sheet
  const [imgElement] = useImage(wmsheet, "Anonymous");
  return (
    <Group>
      <Image
        image={imgElement}
        x={13}
        y={554}
        cropX={weaponMap[weapon][0]}
        cropY={weaponMap[weapon][1]}
        cropWidth={75}
        cropHeight={72}
        width={27}
        height={27}
      />
      <Image
        image={imgElement}
        x={170}
        y={555}
        cropX={moveMap[movement]}
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